'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import TabBar from '@/components/TabBar';
import collectionImage from '@/public/images/collection-hero.png';
import CollectionCard from '@/components/CollectionCard';
import { CollectionApi } from '@/api/collectionApi';
import { BigSpinner } from '@/components/Spinner';
import { Collection2 } from '@/models/Collection';

const Collections = () => {
  const [collections, setCollections] = useState<Collection2[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [gridType, setGridType] = useState(0);
  const [searchParam, setSearchParam] = useState('');
  const [orderBy, setOrderBy] = useState('date');
  const [orderDir, setOrderDir] = useState('desc');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [isFetching, setIsFetching] = useState(true);
  const [imgWidth, setImgWidth] = useState(400);
  const [totalCount, setTotalCount] = useState(2);

  const totalCountRef = useRef(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchCollections = async () => {
    try {
      setIsFetching(true);
      const data = await CollectionApi.getCollectionByParams(searchParam, orderBy, orderDir, offset, limit);
      const collectionData = data.rows;
      totalCountRef.current = data.totalCount;
      setTotalCount(data.totalCount);
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
    setOffset(0); // Reset offset to 0
    setCollections([]); // Clear previous collections
  }, [searchParam, orderBy, orderDir]);

  useEffect(() => {
    fetchCollections();
  }, [searchParam, orderBy, orderDir, offset, limit]);

  useEffect(() => {
    const updateImgWidth = () => {
      if (window.innerWidth < 768) setImgWidth(448);
      else setImgWidth(window.innerWidth * 0.4);
    };

    window.addEventListener('resize', updateImgWidth);
    updateImgWidth();

    return () => window.removeEventListener('resize', updateImgWidth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        // Near the bottom of the page
        console.log(totalCountRef.current);
        if (!isFetching && offset + limit - 1 < totalCountRef.current) {
          // Prevent fetching if all items are loaded
          setOffset((prevOffset) => prevOffset + limit);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  const handleFilledIconClick = () => {
    setGridType(1);
    setLimit(21); // Change limit to 21
    setOffset(0); // Reset offset
  };

  const handleDashboardIconClick = () => {
    setGridType(0);
    setLimit(16); // Change limit to 21
    setOffset(0); // Reset offset
  };

  return (
    <div className='mx-[20px] md:p-20 md:ml-[41px] md:mt-[41px] md:mb-[40px] md:mr-[20px]'>
      <Hero
        heading='Explore top Collection'
        desription='Solana Name services (SNS) are domain names provided for users on the Solana blockchain; which can be bought and sold on a secondary market.'
        buttonText='Go to Launchpad'
        image={collectionImage.src}
        imgWidth={imgWidth}
        imgHeight={359}
      />
      <TabBar pathname='collections' onFilledIconClick={handleFilledIconClick} onDashboardIconClick={handleDashboardIconClick} />
      <SearchBar setSearchParam={setSearchParam} setOrderBy={setOrderBy} setOrderDir={setOrderDir} placeholder='Search NFT by Title' />
      <div className='flex py-5 justify-center gap-2 md:gap-4'>
        {isFetching && offset === 0 ? (
          <div className='h-full absolute items-center justify-center w-full z-10'>
            <BigSpinner />
          </div>
        ) : (
          <div className='flex gap-4 md:gap-4 flex-wrap py-3 md:py-0 justify-center'>
            {collections && collections.length == 0 && !isFetching ? (
              <div className='text-neutral-500 text-xl'>No Collection found</div>
            ) : (
              collections.map((collection, index) => (
                <Link href={{ pathname: `collection/${collection.symbol}` }} key={index}>
                  <CollectionCard
                    id={collection.id}
                    name={collection.name}
                    description={collection.description}
                    image={`${collection.logoImage}`}
                    coverImage={`${collection.baseImage}`}
                    isVerified={collection.isVerified}
                    gridType={gridType}
                  />
                </Link>
              ))
            )}
            {isFetching && offset > 0 && (
              <div ref={loaderRef} className='flex justify-center items-center w-full'>
                <BigSpinner />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
