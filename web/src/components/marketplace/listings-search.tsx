'use client';

import { InstantSearch, SearchBox, Hits, Configure } from "react-instantsearch";
import { searchClient, ALGOLIA_INDEX_NAME } from "@/lib/algolia-search";
import Link from "next/link";
import Image from "next/image";

function Hit({ hit }: { hit: any }) {
  return (
    <Link href={`/marketplace/${hit.objectID}`} className="block border border-neutral-100 rounded-lg p-3 hover:border-neutral-200">
      <div className="relative h-32 w-full rounded-md overflow-hidden bg-neutral-100 mb-2">
        {hit.photos?.[0] && (
          <Image src={hit.photos[0]} alt={hit.title} fill sizes="300px" className="object-cover" />
        )}
      </div>
      <p className="text-sm font-medium text-neutral-700">{hit.title}</p>
      <p className="text-xs text-neutral-500">{hit.category}</p>
    </Link>
  );
}

export function ListingsSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      <Configure filters="status:active" hitsPerPage={12} />
      <SearchBox placeholder="Search listings..." classNames={{ input: 'w-full rounded-lg border-neutral-100 px-3 py-2 text-sm' }} />
      <Hits hitComponent={Hit} classNames={{ list: 'grid grid-cols-2 md:grid-cols-3 gap-4 mt-4' }} />
    </InstantSearch>
  );
}