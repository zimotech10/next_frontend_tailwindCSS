import Hero from "@/components/Hero";
import exploreImage from "../../public/images/explore-hero.png";

const ExplorePage = () => {
  return (
    <div className="font-electronica md:p-20">
      <Hero
        heading={
          <>
            Explore <br /> incredible art
          </>
        }
        desription="Lampapuy NFT provides marketing and smart contract services to Elevate your brand by connecting it with more buyers."
        buttonText="Create an NFT"
        image={exploreImage.src}
      />
    </div>
  );
};

export default ExplorePage;
