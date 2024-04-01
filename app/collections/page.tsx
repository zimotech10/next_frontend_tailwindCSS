import Hero from "@/components/Hero";
import TabBar from "@/components/TabBar";
import collectionImage from "@/public/images/collection-hero.png";

const Collections = () => {
  return (
    <div className="md:p-20">
      <Hero
        heading="Explore top Collection"
        desription="Solana Name services (SNS) are domain names provided for users on the Solana blockchain; which can be bought and sold on a secondary market."
        buttonText="Go to Launchpad"
        image={collectionImage.src}
      />
      <TabBar pathname="collections" />
    </div>
  );
};

export default Collections;
