"use client";

import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import TabBar from "@/components/TabBar";
import collectionImage from "@/public/images/collection-hero.png";
import CollectionCard from "@/components/CollectionCard";
import { getCollectionByParams } from "@/api/collectionApi";
import { useEffect, useState, useRef } from "react";
import BigSpinner from "@/components/Spinner";
import { Collection2 } from "@/models/Collection";
import Link from "next/link";

const Collections = () => {
  const [collections, setCollections] = useState<Collection2[]>([]);
  const [error, setError] = useState(null);

  const [searchParam, setSearchParam] = useState("");
  const [orderBy, setOrderBy] = useState("date");
  const [direction, setDirection] = useState('desc');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isFetching, setIsFetching] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  const fetchCollections = async () => {
    try {
      setIsFetching(true);
      const data = await getCollectionByParams(searchParam, orderBy, direction, offset, limit);
      const collectionData = data.data.rows;

      setCollections((prevCollections) => {
        if (offset > prevCollections.length) {
          return [...prevCollections, ...collectionData];
        } else if (offset < prevCollections.length) {
          return [...collectionData, ...prevCollections];
        } else {
          return prevCollections;
        }
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [searchParam, orderBy, direction, offset, limit]);

  const handleScroll = () => {
    const grid = gridRef.current;
    if (grid) {
      const { scrollTop, scrollHeight, clientHeight } = grid;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
        setOffset((prevOffset) => prevOffset + limit);
      }

      if (scrollTop <= 100 && !isFetching && offset > 0) {
        setOffset((prevOffset) => Math.max(0, prevOffset - limit));
      }
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (grid) {
        grid.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isFetching, offset]);

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
      <SearchBar 
        setSearchParam={setSearchParam} 
        setOrderBy={setOrderBy} 
        setDirection={setDirection} 
        placeholder="Search Collections by Title" 
      />
      <div 
        ref={gridRef} 
        className="grid overflow-y-auto py-5 justify-center gap-2 md:gap-4"
      >
        {isFetching && (
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
                  image={`https://bictory-marketplace-backend.onrender.com${collection.logoImage}`}
                  coverImage={`https://bictory-marketplace-backend.onrender.com${collection.baseImage}`}
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
