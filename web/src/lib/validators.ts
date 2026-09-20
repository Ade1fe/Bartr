import { z } from "zod";
import { NIGERIA_STATES } from "@/types/location";


export const locationSchema = z.object({
  city: z.string().min(1).max(60),
  state: z.enum(NIGERIA_STATES),
  lat: z.number().nullable().default(null),
  lng: z.number().nullable().default(null),
});

const listingBaseFields = {
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  category: z.enum(['electronics', 'furniture', 'clothing', 'books', 'tools', 'sports', 'food', 'collectibles', 'other']),
  offerTags: z.array(z.string().min(1).max(30)).min(1).max(10),
  wantTags: z.array(z.string().min(1).max(30)).min(1).max(10),
  estimatedValue: z.number().int().min(0).max(50_000_000),
  photos: z.array(z.string().url()).min(1).max(5),
}

export const createUserSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  location: locationSchema.optional(), // optional at signup — see reasoning below
  bio: z.string().max(300).optional(),
  photoURL: z.string().url().nullable().optional(),
  idDocumentUrl: z.string().url().nullable().optional(),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  bio: z.string().max(300).optional(),
  location: locationSchema.optional(),
  profilePictureUrl: z.string().url().nullable().optional(),
  phoneNumber: z.string().optional(),
  accountType: z.enum(['individual', 'business']).optional(),
});

export const createListingSchema = z.discriminatedUnion('listingType', [
  z.object({
    listingType: z.literal('good'),
    condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']),
    ...listingBaseFields,
  }),
  z.object({
    listingType: z.literal('service'),
    tradeType: z.enum(['one_time', 'recurring', 'flexible']),
    availability: z.enum(['immediate', 'scheduled', 'by_appointment']),
    deliveryDuration: z.string().max(100).optional(),
    ...listingBaseFields,
  })
]);


export const updateListingSchema = z.object({
  listingId: z.string().min(1),
  title: z.string().min(3).max(100).optional(),
  description: z.string().min(10).max(1000).optional(),
  category: z.enum(['electronics', 'furniture', 'clothing', 'books', 'tools', 'sports', 'food', 'collectibles', 'other']).optional(),
  listingType: z.enum(['good', 'service']).optional(),
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']).optional(),
  tradeType: z.enum(['one_time', 'recurring', 'flexible']).optional(),
  availability: z.enum(['immediate', 'scheduled', 'by_appointment']).optional(),
  deliveryDuration: z.string().max(100).optional(),
  offerTags: z.array(z.string().min(1).max(30)).min(1).max(10).optional(),
  wantTags: z.array(z.string().min(1).max(30)).min(1).max(10).optional(),
  estimatedValue: z.number().int().min(0).max(50_000_000).optional(),
  photos: z.array(z.string().url()).min(1).max(5).optional(),
  status: z.enum(['pending_moderation', 'active', 'hidden', 'in_trade', 'closed', 'deleted']).optional(),
});


export const proposeTradeSchema = z.object({
  receiverListingId: z.string().min(1),
  initiatorListingId: z.string().min(1),
  creditAdjustment: z.number().int().min(-10000).max(10000),
  message: z.string().max(500).optional(),
});


export const respondToTradeSchema = z.object({
  tradeId: z.string().min(1),
  action: z.enum(['accept', 'decline', 'cancel']),
  counterOffer: z.object({
    creditAdjustment: z.number().int().optional(),
    message: z.string().max(500).optional(),
  }).optional(),
});


export const sendMessageSchema = z.object({
  tradeId:  z.string().min(1),
  text: z.string().min(1).max(2000),
});


export const createReviewSchema = z.object({
  tradeId: z.string().min(1),
  revieweeId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(500),
})

export const reportListingSchema = z.object({
  listingId: z.string().min(1),
  reason: z.enum(['prohibited_item', 'counterfeit_or_stolen', 'misleading_description', 'scam_or_fraud', 'inappropriate_content', 'other']),
  details: z.string().max(500).optional(),
})