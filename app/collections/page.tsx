"use client";

import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import TabBar from "@/components/TabBar";
import collectionImage from "@/public/images/collection-hero.png";
import CollectionCard from "@/components/CollectionCard";
import { getCollections } from "@/api/collectionApi";
import { useEffect, useState } from "react";
import BigSpinner from "@/components/Spinner";
import { Collection2 } from "@/models/Collection";
import Link from "next/link";

const Collections = () => {
  const [collections, setCollections] = useState<Collection2[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        const collectionData = data.data.rows;
        setCollections(collectionData);
        console.log(collectionData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

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
        {loading && (
          <div className="h-full items-center justify-center w-full">
            <BigSpinner />
          </div>
        )}
        {collections && (
          <div>
            {collections.map((collection) => (
              <Link
                href={{ pathname: `collection/${collection.symbol}` }}
                key={collection.id}
              >
                <CollectionCard
                  id={collection.id}
                  name={collection.name}
                  description={collection.description}
                  image={`http://95.164.7.220:8000${collection.logoImage}`}
                  coverImage={`http://95.164.7.220:8000${collection.baseImage}`}
                  isVerified={collection.isVerified}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
