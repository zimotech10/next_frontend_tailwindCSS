import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import TabBar from "@/components/TabBar";
import collectionImage from "@/public/images/collection-hero.png";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/stores/mockData";

const Collections = () => {
  return (
    <div className="md:p-20">
      <Hero
        heading="Explore top Collection"
        desription="Solana Name services (SNS) are domain names provided for users on the Solana blockchain; which can be bought and sold on a secondary market."
        buttonText="Go to Launchpad"
        image={collectionImage.src}
        imgWidth={590}
        imgHeight={590}
      />
      <TabBar pathname="collections" />
      <SearchBar placeholder="Search Collections by Title" />
      <div className="flex flex-wrap py-5 justify-center gap-2 md:gap-4">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            name={collection.name}
            description={collection.description}
            image={collection.image.src}
            coverImage={collection.coverImage.src}
            isVerified={collection.verified}
            floor={collection.floor}
            average={collection.average}
          />
        ))}
      </div>
    </div>
  );
};

export default Collections;
