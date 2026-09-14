import Banner from "@/components/home/Banner";
import PopularRoadmaps from "@/components/home/PopularRoadmaps";
import PopularCategories from "@/components/home/PopularCategories";
import WhereToStart from "@/components/home/WhereToStart";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Banner />
      <PopularRoadmaps />
      <PopularCategories />
      <WhereToStart />
      <FAQ />
    </>
  );
}
