import { algoliasearch } from 'algoliasearch';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!
)

export const INDEX_NAME = 'bartr_listings';


// Save a new listing to the index (create or overwrite)
export async function saveListingToIndex(listing: {
  objectID: string;
  title: string;
  description: string;
  category: string;
  offerTags: string[];
  wantTags: string[];
  creditValue: number;
  condition: string;
  userId: string;
  photos: string[];
  status: string;
}) {
    return client.saveObject({
      indexName: INDEX_NAME,
      body: listing,
    })
}


// Update specific fields on an existing index record
export async function updateListingInIndex(objectID: string, fields: Record<string, unknown>) {
  return client.partialUpdateObject({
    indexName: INDEX_NAME,
    objectID,
    attributesToUpdate: fields,
  })
}



// Remove a listing from the index
export async function deleteListingFromIndex(objectID: string) {
  return client.deleteObject({
    indexName: INDEX_NAME,
    objectID,
  })
}