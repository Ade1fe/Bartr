import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { reportListingSchema } from "@/lib/validators";
import { reportListing } from "@/lib/moderation";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const body = await req.json();
    const { listingId, reason, details } = reportListingSchema.parse(body);

    const result = await reportListing(listingId, decoded.uid, reason, details);

    if (!result.ok) {
      throw new AppError(result.error, 400);
    }

    return NextResponse.json({ reported: true });
  }
  catch (err) {
    return handleApiError(err);
  }
}