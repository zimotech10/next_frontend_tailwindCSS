"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import TabBar from "@/components/TabBar";
import exploreImage from "@/public/images/explore-hero.png";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import ItemCard from "@/components/ItemCard";
import { Icon } from "@iconify-icon/react";
import PopUp from "@/components/PopUp";
import { NftApi } from "@/api/nftApi";

// Define the NFT type
interface Nft {
  id: number;
  name: string;
  uri: string;
  collection: string;
  price: string;
  mintAddress: string;
}

const NftsByCollection = ({ params }: { params: { symbol: string } }) => {
  const [filter, setFilter] = useState(false);
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    const fetchNfts = async () => {
      const nfts = await NftApi.getNftsByCollection(params.symbol);
      setNfts(nfts);
      console.log(nfts);
    };
    fetchNfts();
  }, [params.symbol]);

  return (
    <div className="md:p-20">
      <Hero
        heading="Explore Incredible Art"
        desription="Lampapuy NFT provides marketing and smart contract services to Elevate your brand by connecting it with more buyers."
        buttonText="Create an NFT"
        image={exploreImage.src}  
        imgHeight={1000}
        imgWidth={1000}
      />
      <TabBar pathname="items" />
      <SearchBar placeholder="Search NFT by Title" />
      <div className="flex flex-col md:gap-8 md:flex-row">
        <div className="h-0 md:h-fit invisible md:visible">
          <Filter />
        </div>
        <div className="flex flex-row p-5 justify-between md:hidden relative">
          <button
            onClick={() => setFilter(!filter)}
            className="w-40 flex justify-center py-2 font-semibold text-black"
            style={{
              background:
                "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
              borderRadius: "40px",
            }}
            aria-label="Add filter"
          >
            Add filter
          </button>
          <button
            className="w-40 flex items-center gap-1 justify-center py-2 font-semibold text-white"
            style={{
              border: "1.5px solid var(--Color-Gradient-01, #F88430)",
              borderRadius: "40px",
            }}
            aria-label="Sweep"
          >
            Sweep
            <Icon icon="fluent:broom-16-regular" />
          </button>
          {filter && (
            <div className="absolute z-30 top-24">
              <Filter />
            </div>
          )}
        </div>
        <div className="flex gap-4 md:gap-6 flex-wrap py-3 md:py-0 justify-center">
          {
            nfts.length === 0 ? 
            (<div className="text-neutral-500 text-xl">No NFT Found In This Collection</div>)
            : nfts.map((nft) => (
              <ItemCard
                key={nft.id}
                name={nft.name}
                uri={nft.uri}
                price={nft.price}
                mintAddress={nft.mintAddress?.toString()}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default NftsByCollection;