import Banner from "@/components/home/Banner";
import PopularRoadmaps from "@/components/home/PopularRoadmaps";
import PopularCategories from "@/components/home/PopularCategories";
import AIInterviewShowcase from "@/components/home/AIInterviewShowcase";
import QuestionBankShowcase from "@/components/home/QuestionBankShowcase";
import WhereToStart from "@/components/home/WhereToStart";
import AllInOneShowcase from "@/components/home/AllInOneShowcase";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Banner />
      <PopularRoadmaps />
      <PopularCategories />
      <AIInterviewShowcase />
      <QuestionBankShowcase />
      <WhereToStart />
      <AllInOneShowcase />
      <FAQ />
    </>
  );
}