'use client'

import { useState, useEffect, useCallback } from "react";
import { algoliasearch } from "algoliasearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
)

export function useSearch(query: string, category?: string) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const filters = ['status:active'];
      if (category) filters.push(`category:${category}`);

      const response = await client.searchForHits({
        requests: [{
          indexName: 'bartr_listings',
          query,
          filters: filters.join(' AND '),
          hitsPerPage: 20,
        }]
      })

      setResults(response.results[0].hits);
    }
    catch (err) {
      console.error('Search error:', err);
    }
    finally {
      setLoading(false);
    }
  }, [query, category])


  useEffect(() => {
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return { results, loading };
}