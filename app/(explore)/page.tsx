import Hero from "@/components/Hero";
import TabBar from "@/components/TabBar";
import exploreImage from "../../public/images/explore-hero.png";

const ExplorePage = () => {
  return (
    <div className="md:p-20">
      <Hero
        heading="Explore Incredible Art"
        desription="Lampapuy NFT provides marketing and smart contract services to Elevate your brand by connecting it with more buyers."
        buttonText="Create an NFT"
        image={exploreImage.src}
      />
      <TabBar pathname="items" />
    </div>
  );
};

export default ExplorePage;
