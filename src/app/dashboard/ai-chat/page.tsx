"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiSend, FiCpu, FiUser, FiTrash2 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import type { ChatMessage } from "@/types/chat";

async function fetchChatHistory(): Promise<ChatMessage[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load chat history");
  return data.data;
}

async function clearChatHistory() {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/history`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to clear chat");
  return data;
}

const defaultPrompts = [
  "What should I learn next?",
  "Am I ready for a job?",
  "Improve my resume",
];

export default function AIChatPage() {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(defaultPrompts);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["chat-history"],
    queryFn: fetchChatHistory,
  });

  // Streaming-aware send function
  const sendMutation = useMutation({
    mutationFn: async (message: string) => {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok || !res.body) throw new Error("Failed to send message");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalReply = "";
      let finalPrompts: string[] = defaultPrompts;

      setStreamingText("");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = JSON.parse(line.replace("data: ", ""));

          if (payload.type === "chunk") {
            setStreamingText((prev) => (prev ?? "") + payload.text);
          } else if (payload.type === "done") {
            finalReply = payload.reply;
            finalPrompts = payload.suggestedPrompts ?? defaultPrompts;
          } else if (payload.type === "error") {
            throw new Error(payload.message);
          }
        }
      }

      return { reply: finalReply, suggestedPrompts: finalPrompts };
    },
    onMutate: async (message: string) => {
      await queryClient.cancelQueries({ queryKey: ["chat-history"] });
      const previous = queryClient.getQueryData<ChatMessage[]>(["chat-history"]) ?? [];
      queryClient.setQueryData<ChatMessage[]>(["chat-history"], [
        ...previous,
        { role: "user", content: message, timestamp: new Date() },
      ]);
      return { previous };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ChatMessage[]>(["chat-history"], (old = []) => [
        ...old,
        { role: "assistant", content: data.reply, timestamp: new Date() },
      ]);
      setSuggestedPrompts(data.suggestedPrompts ?? defaultPrompts);
      setStreamingText(null);
    },
    onError: (_err, _message, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["chat-history"], context.previous);
      }
      setStreamingText(null);
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearChatHistory,
    onSuccess: () => {
      queryClient.setQueryData(["chat-history"], []);
      setSuggestedPrompts(defaultPrompts);
    },
  });

  const handleSend = (text?: string) => {
    const message = (text ?? input).trim();
    if (!message || sendMutation.isPending) return;
    sendMutation.mutate(message);
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sendMutation.isPending, streamingText]);

  return (
    <div className="mx-auto flex h-[calc(100dvh-8rem)] max-w-3xl flex-col sm:h-[calc(100dvh-9rem)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            AI Career Coach
          </h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Ask anything about your career journey.
          </p>
        </div>
        {messages && messages.length > 0 && (
          <button
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FiTrash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="card custom-scrollbar flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-5"
      >
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-900 dark:border-t-indigo-400" />
              <p className="text-sm text-slate-400 dark:text-slate-500">Loading conversation...</p>
            </div>
          </div>
        )}

        {!isLoading && (!messages || messages.length === 0) && !streamingText && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/80 dark:from-indigo-950/50 dark:to-violet-950/50 dark:border-indigo-900/40">
              <FiCpu className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Hello! How can I help you today?
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Ask about roadmaps, skills, or job readiness.
            </p>
          </div>
        )}

        {messages?.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                msg.role === "user"
                  ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  : "bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 border border-indigo-100/80 dark:from-indigo-950/60 dark:to-violet-950/60 dark:text-indigo-400 dark:border-indigo-900/50"
              }`}
            >
              {msg.role === "user" ? <FiUser className="h-4 w-4" /> : <FiCpu className="h-4 w-4" />}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs dark:from-indigo-500 dark:to-violet-500"
                  : "border border-slate-200/80 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Live streaming bubble */}
        {sendMutation.isPending && streamingText !== null && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 border border-indigo-100/80 dark:from-indigo-950/60 dark:to-violet-950/60 dark:text-indigo-400 dark:border-indigo-900/50">
              <FiCpu className="h-4 w-4" />
            </div>
            <div className="max-w-[75%] rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 sm:max-w-[70%]">
              {streamingText.length > 0 ? (
                streamingText
              ) : (
                <div className="flex items-center gap-1.5 py-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 dark:bg-indigo-400" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {suggestedPrompts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={sendMutation.isPending}
              className="inline-flex cursor-pointer items-center rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-60 dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 flex w-full items-center gap-1.5 sm:gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything..."
          className="h-10 sm:h-11 flex-1 rounded-xl border border-slate-200/80 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
        />
        <button
          onClick={() => handleSend()}
          disabled={sendMutation.isPending || !input.trim()}
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <FiSend className="h-[18px] w-[18px] sm:h-5 sm:w-5 shrink-0" />
        </button>
      </div>
    </div>
  );
}