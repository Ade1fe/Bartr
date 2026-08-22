'use client';

import { useState } from "react";
import { SearchBox, useRefinementList } from "react-instantsearch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Bell } from "lucide-react";

interface SearchFilterBarProps {
  locationMode: string;
  onLocationModeChange: (mode: string) => void;
  onOpenFilters: () => void;
}

const CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'tools', label: 'Tools' },
  { value: 'sports', label: 'Sports' },
  { value: 'food', label: 'Food' },
  { value: 'collectibles', label: 'Collectibles' },
  { value: 'other', label: 'Other' },
]

const LOCATIONS = [
  { value: 'nearby', label: 'Nearby' },
  { value: 'city', label: 'City' },
  { value: 'state', label: 'State' },
  { value: 'national', label: 'National' },
]

export function SearchFilterBar({ locationMode, onLocationModeChange, onOpenFilters }: SearchFilterBarProps) {
  const { items, refine } = useRefinementList({ attribute: 'category' });
  const [category, setCategory] = useState('all');

  function handleCategoryChange(value: string) {
    setCategory(value);
    if (category !== 'all') refine(category); // un-refine previous
    if (value !== 'all') refine(value);
  }

  return (
    <div className="bg-white rounded-lg shadow-xs border border-neutral-100 p-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBox
          placeholder="Search for listings..."
          classNames={{
            root: 'flex-1',
            input: 'w-full rounded-lg border border-neutral-100 px-4 py-2.5 text-sm outline-none focus:border-neutral-200 text-neutral-500',
            submitIcon: 'hidden',
            resetIcon: 'hidden',
          }}
        />
        <div className="flex flex-wrap gap-3">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-40 rounded-lg cursor-pointer border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-sm text-neutral-500">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className='bg-white border-none outline-none'>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value} className="capitalize hover:bg-neutral-100 hover:cursor-pointer">{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={locationMode} onValueChange={onLocationModeChange}>
            <SelectTrigger className="w-full sm:w-36 rounded-lg cursor-pointer border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-sm text-neutral-500">
              <SelectValue placeholder="Nearby" />
            </SelectTrigger>
            <SelectContent className='bg-white border-none outline-none'>
              <SelectGroup>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location.value} value={location.value} className="capitalize hover:bg-neutral-100 hover:cursor-pointer">{location.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={onOpenFilters} className="rounded-lg border-neutral-100 shrink-0" aria-label="More filters" >
            <SlidersHorizontal size={16} className='text-neutral-500' />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-neutral-500 flex-wrap">
        <span>Saved searches:</span>
        {/* Static for now — wire to a real savedSearches subcollection on the user doc once that exists */}
        <button className="flex items-center gap-1 border border-neutral-200 rounded-full px-3 py-1 text-neutral-700 hover:bg-neutral-50">
          Photography services <Bell size={12} />
        </button>
        <button className="text-neutral-600 hover:text-black">+ Add Search Alert</button>
      </div>
    </div>
  );
}