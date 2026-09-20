import { adminDb } from '@/lib/firebase-admin';
import { AppError } from '@/lib/errors';
import type { GeoLocation } from '@/types/location';

/**
 * The one place listing creation gets a seller's location from.
 * Throws clearly instead of letting a listing get created with
 * missing location data that would silently break geosearch later.
 */
export async function getSellerLocationOrThrow(userId: string): Promise<GeoLocation> {
  const userSnap = await adminDb.collection('users').doc(userId).get();
  const location = userSnap.data()?.location as GeoLocation | null | undefined;

  if (!location?.city || !location?.state) {
    throw new AppError(
      'Add your city and state to your profile before creating a listing.',
      400
    );
  }

  return location;
}