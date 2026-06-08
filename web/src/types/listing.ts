export type ListingCategory = 'electronics' | 'fashion' | 'food' | 'services' | 'furniture' | 'books' | 'sports' | 'other';

export type ListingStatus = 'active' | 'pending' | 'traded' | 'closed';

export interface ListingImage {
  url: string;
  publicId: string;
}

export interface Listing {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: ListingCategory;
  images: ListingImage[];
  estimatedValue: number;
  wantInReturn: string;
  location?: {
    country: string;
    state: string;
    city: string;
  };
  status: ListingStatus;
  tags?: string[];
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}