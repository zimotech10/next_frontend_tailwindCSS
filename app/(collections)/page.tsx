'use client';

import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import TabBar from '@/components/TabBar';
import collectionImage from '@/public/images/collection-hero.png';
import CollectionCard from '@/components/CollectionCard';
import { CollectionApi } from '@/api/collectionApi';
import { useEffect, useState, useRef } from 'react';
import BigSpinner from '@/components/Spinner';
import { Collection2 } from '@/models/Collection';
import Link from 'next/link';

const Collections = () => {
  const [collections, setCollections] = useState<Collection2[]>([]);
  const [error, setError] = useState(null);

  const [searchParam, setSearchParam] = useState('');
  const [orderBy, setOrderBy] = useState('date');
  const [orderDir, setOrderDir] = useState('desc');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isFetching, setIsFetching] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  const fetchCollections = async () => {
    try {
      setIsFetching(true);
      const data = await CollectionApi.getCollectionByParams(searchParam, orderBy, orderDir, offset, limit);
      const collectionData = data.rows;

      setCollections((prevCollections) => {
        // Check if it's the first fetch or the offset is reset
        if (offset === 0) {
          return collectionData;
        }

        // Append or prepend based on the offset
        if (offset >= prevCollections.length) {
          return [...prevCollections, ...collectionData];
        } else {
          return [...collectionData, ...prevCollections];
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
  }, [searchParam, orderBy, orderDir, offset, limit]);

  const previousScrollTop = useRef(0); // To track the previous scroll position

  const handleScroll = () => {
    const grid = gridRef.current;
    if (grid) {
      const { scrollTop, scrollHeight, clientHeight } = grid;

      // Determine if the user is scrolling down
      const isScrollingDown = scrollTop > previousScrollTop.current;

      // Update the previous scroll position
      previousScrollTop.current = scrollTop;

      // Only fetch if scrolling down and near the bottom
      if (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (grid) {
        grid.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isFetching, offset]);

  return (
    <div className='mx-[20px] md:p-20 md:ml-[41px] md:mt-[41px] md:mb-[40px] md:mr-[20px]'>
      <Hero
        heading='Explore top Collection'
        desription='Solana Name services (SNS) are domain names provided for users on the Solana blockchain; which can be bought and sold on a secondary market.'
        buttonText='Go to Launchpad'
        image={collectionImage.src}
        imgWidth={448}
        imgHeight={359}
      />
      <TabBar pathname='collections' />
      <SearchBar setSearchParam={setSearchParam} setOrderBy={setOrderBy} setOrderDir={setOrderDir} placeholder='Search NFT by Title' />
      <div className='flex py-5 justify-center gap-2 md:gap-4' ref={gridRef}>
        {isFetching && (
          <div className='h-full absolute items-center justify-center w-full z-10'>
            <BigSpinner />
          </div>
        )}

        <div className='flex gap-4 md:gap-4 flex-wrap py-3 md:py-0'>
          {collections.length == 0 && !isFetching ? (
            <div className='text-neutral-500 text-xl'>No Collection found</div>
          ) : (
            collections.map((collection, index) => (
              <Link href={{ pathname: `collection/${collection.symbol}` }} key={index}>
                <CollectionCard
                  key={index}
                  id={collection.id}
                  name={collection.name}
                  description={collection.description}
                  image={`${collection.logoImage}`}
                  coverImage={`${collection.baseImage}`}
                  isVerified={collection.isVerified}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
