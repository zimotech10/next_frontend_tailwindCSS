'use client';

import { useState } from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { IBM_Plex_Sans } from 'next/font/google';
import Checkbox from './Checkbox';
import { triggerAsyncId } from 'async_hooks';

const ipmSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

interface AccordionState {
  statusOpen: boolean;
  blockchainOpen: boolean;
  priceOpen: boolean;
  backgroundOpen: boolean;
  collectionOpen: boolean;
  attributesOpen: boolean;
}

interface Attribute {
  values: string[];
  trait_type: string;
}

interface FilterProps {
  attributes: Attribute[];
  filterAttributes: Attribute[];
  onStatusChange: (status: any) => void;
  onMinPriceChange: (status: number) => void;
  onMaxPriceChange: (status: number) => void;
  onAttributeChange: (attributes: Attribute[]) => void;
}

const Filter = ({
  attributes,
  filterAttributes,
  onStatusChange,
  onMinPriceChange,
  onMaxPriceChange,
  onAttributeChange,
}: FilterProps) => {
  const [accordionState, setAccordionState] = useState<AccordionState>({
    statusOpen: false,
    blockchainOpen: false,
    priceOpen: false,
    backgroundOpen: false,
    collectionOpen: false,
    attributesOpen: false,
  });

  const toggleAccordion = (accordion: keyof AccordionState) => {
    setAccordionState({
      ...accordionState,
      [accordion]: !accordionState[accordion],
    });
  };

  const [attributeState, setAttributeState] = useState<Record<string, boolean>>(
    {}
  );

  const toggleAttributeAccordion = (traitType: string) => {
    setAttributeState((prevState) => ({
      ...prevState,
      [traitType]: !prevState[traitType],
    }));
  };

  const handleStatusChange = (status: number) => {
    onStatusChange(status);
  };

  const handleMinPriceChange = (min: number) => {
    onMinPriceChange(min);
  };

  const handleMaxPriceChange = (max: number) => {
    onMaxPriceChange(max);
  };

  const handleAttributeChange = (traitType: any) => {
    const updatedAttributes = filterAttributes.map((attribute) => {
      if (attribute.trait_type === traitType.trait_type) {
        if (attribute.values.includes(traitType.value)) {
          // Remove the value if it already exists
          return {
            ...attribute,
            values: attribute.values.filter((v) => v !== traitType.value),
          };
        } else {
          // Add the value if it doesn't exist
          return {
            ...attribute,
            values: [...attribute.values, traitType.value],
          };
        }
      }
      return attribute;
    });

    // Check if the traitType.trait_type is not in filterAttributes
    const traitTypeExists = updatedAttributes.some(
      (attribute) => attribute.trait_type === traitType.trait_type
    );

    if (!traitTypeExists) {
      // Add the new traitType if it doesn't exist
      updatedAttributes.push({
        trait_type: traitType.trait_type,
        values: [traitType.value],
      });
    }

    const filteredAttributes = updatedAttributes.filter(
      (attribute) => attribute.values && attribute.values.length > 0
    );

    onAttributeChange(filteredAttributes);
  };

  return (
    <div
      className={`flex flex-col gap-6 rounded-md border-neutral-800 md:border-none md:rounded-none bg-black ${ipmSans.className}`}
      style={{ width: '250px', padding: '14px' }}
    >
      <div className='font-normal text-sm'>Filter/Type</div>

      {/* Static Sections */}
      <div className='flex flex-col gap-4'>
        <div
          className='flex flex-row items-center justify-between cursor-pointer'
          onClick={() => toggleAccordion('statusOpen')}
        >
          <span className='font-bold text-sm'>Status</span>
          <Icon
            icon={
              accordionState.statusOpen
                ? 'majesticons:minus'
                : 'majesticons:plus'
            }
            width={20}
            style={{ color: '#4b4b4b' }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.statusOpen ? 'h-auto' : 'h-0'
          }`}
        >
          <Checkbox
            label='Fixed Price'
            type='status'
            traitType=''
            onCheckboxChange={onStatusChange}
          />
          <Checkbox
            label='Auction'
            type='status'
            traitType=''
            onCheckboxChange={onStatusChange}
          />
          {/* <Checkbox label='Fixed Price' onChange={() => handleStatusChange(1)} />
          <Checkbox label='Auction' onChange={() => handleStatusChange(2)} /> */}
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div
          className='flex flex-row items-center justify-between cursor-pointer'
          onClick={() => toggleAccordion('priceOpen')}
        >
          <span className='font-bold text-sm'>Price</span>
          <Icon
            icon={
              accordionState.priceOpen
                ? 'majesticons:minus'
                : 'majesticons:plus'
            }
            width={20}
            style={{ color: '#4b4b4b' }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.priceOpen ? 'h-auto' : 'h-0'
          }`}
        >
          <div
            className='px-4 py-2 rounded-md w-full'
            style={{ backgroundColor: '#0B0A0A' }}
          >
            Solana(SOL)
          </div>
          <div className='flex flex-row justify-center gap-3 items-center'>
            <input
              type='number'
              placeholder='min'
              className='px-4 py-2 rounded-md w-fit'
              style={{ backgroundColor: '#0B0A0A', width: '88px' }}
              onChange={(e) => handleMinPriceChange(parseInt(e.target.value))}
              min={0}
            />
            <span>to</span>
            <input
              type='number'
              placeholder='max'
              className='px-4 py-2 rounded-md w-fit'
              style={{ backgroundColor: '#0B0A0A', width: '88px' }}
              onChange={(e) => handleMaxPriceChange(parseInt(e.target.value))}
              min={0}
            />
          </div>
        </div>
      </div>

      {/* Attributes Section */}
      <div className='flex flex-col gap-4'>
        <div
          className='flex flex-row items-center justify-between cursor-pointer'
          onClick={() => toggleAccordion('attributesOpen')}
        >
          <span className='font-bold text-sm'>Attributes</span>
          <Icon
            icon={
              accordionState.attributesOpen
                ? 'majesticons:minus'
                : 'majesticons:plus'
            }
            width={20}
            style={{ color: '#4b4b4b' }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.attributesOpen ? 'h-auto' : 'h-0'
          }`}
        >
          {attributes
            ? attributes.map((attribute) => (
                <div
                  key={attribute.trait_type}
                  className='flex flex-col gap-4 pl-2'
                >
                  <div
                    className='flex flex-row items-center justify-between cursor-pointer'
                    onClick={() =>
                      toggleAttributeAccordion(attribute.trait_type)
                    }
                  >
                    <span className='font-bold text-sm'>
                      {attribute.trait_type}
                    </span>
                    <Icon
                      icon={
                        attributeState[attribute.trait_type]
                          ? 'majesticons:minus'
                          : 'majesticons:plus'
                      }
                      width={20}
                      style={{ color: '#4b4b4b' }}
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
                      attributeState[attribute.trait_type] ? 'h-auto' : 'h-0'
                    }`}
                  >
                    {attribute.values.map((value) => (
                      <Checkbox
                        key={value}
                        label={value}
                        type='attribute'
                        traitType={attribute.trait_type}
                        onCheckboxChange={handleAttributeChange}
                      />
                      // <Checkbox key={value} label={value} onChange={() => handleAttributeChange(attribute.trait_type, value)} />
                    ))}
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Filter;
