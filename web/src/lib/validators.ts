import { z } from "zod";

export const createListingSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  category: z.enum(['electronics', 'furniture', 'clothing', 'books', 'tools', 'sports', 'food', 'collectibles', 'other']),
  offerTags: z.array(z.string().min(1).max(30)).min(1).max(10),
  wantTags: z.array(z.string().min(1).max(30)).min(1).max(10),
  creditValue: z.number().int().min(0).max(50000),
  photos: z.array(z.string().url()).min(1).max(5),
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']),
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