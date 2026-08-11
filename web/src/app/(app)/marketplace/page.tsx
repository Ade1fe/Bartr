'use client';

import { useState } from "react";
import { InstantSearch, Configure, Hits } from "react-instantsearch";
import { searchClient, ALGOLIA_INDEX_NAME } from "@/lib/algolia-search";
import { SearchFilterBar } from "@/components/marketplace/search-filter";
import { ListingCard } from "@/components/marketplace/listing-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List } from "lucide-react";
import { useLocationFilter } from "@/hooks/use-location-filter";

export default function MarketplacePage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { locationMode, setLocationMode, geoConfig } = useLocationFilter();

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6 py-6 md:py-8 space-y-4">
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
        <Configure filters="status:active" hitsPerPage={12} {...geoConfig} />

        <SearchFilterBar locationMode={locationMode} onLocationModeChange={setLocationMode} onOpenFilters={() => {/* open a Sheet with condition/credit-range refinements */}} />

        <div className="flex items-center justify-between">
          <Tabs defaultValue="browse">
            <TabsList className="bg-neutral-100 rounded-xl p-1">
              <TabsTrigger value="browse" className="rounded-lg data-[state=active]:bg-white text-neutral-900 text-xs md:text-sm font-normal cursor-pointer">Browse All</TabsTrigger>
              <TabsTrigger value="matches" className="rounded-lg data-[state=active]:bg-white text-neutral-900 text-xs md:text-sm font-normal cursor-pointer">Smart Matches</TabsTrigger>
              <TabsTrigger value="saved" className="rounded-lg data-[state=active]:bg-white text-neutral-900 text-xs md:text-sm font-normal cursor-pointer">Saved</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="hidden sm:flex items-center gap-1 border border-neutral-100 rounded-lg p-1">
            <button onClick={() => setView('grid')} className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-neutral-100' : ''}`} aria-label="Grid view">
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setView('list')} className={`p-1.5 rounded-md ${view === 'list' ? 'bg-neutral-100' : ''}`} aria-label="List view">
              <List size={16} />
            </button>
          </div>
        </div>

        <Hits
          hitComponent={ListingCard}
          classNames={{
            list: view === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
              : 'flex flex-col gap-3',
          }}
        />
      </InstantSearch>
    </div>
  );
}