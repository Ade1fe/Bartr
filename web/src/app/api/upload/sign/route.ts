import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { handleApiError, AppError } from '@/lib/errors';
import { generateUploadSignature, FOLDERS } from '@/lib/cloudinary';
import { z } from 'zod';

const schema = z.object({
  type: z.enum(['listings', 'profiles', 'idDocuments', 'tradeEvidence']),
  tradeId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const body = await req.json();
    const { type, tradeId } = schema.parse(body);

    let folder: string;

    switch (type) {
      case 'listings':
        folder = FOLDERS.listings(userId);
        break;
      case 'profiles':
        folder = FOLDERS.profiles(userId);
        break;
      case 'idDocuments':
        folder = FOLDERS.idDocuments(userId);
        break;
      case 'tradeEvidence':
        if (!tradeId) {
          throw new AppError('tradeId is required for trade evidence uploads', 400);
        }
        folder = FOLDERS.tradeEvidence(tradeId, userId);
        break;
      default:
        throw new AppError('Invalid upload type', 400);
    }

    const signatureData = await generateUploadSignature(folder);
    return NextResponse.json(signatureData);
  }
  catch (err) {
    return handleApiError(err);
  }
}
