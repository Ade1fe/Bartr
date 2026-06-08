import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export { cloudinary };

// FOLDER CONSTANTS

const PROJECT_ROOT = 'bartr';

export const FOLDERS = {
  listings: (userId: string) => `${PROJECT_ROOT}/listings/${userId}`,
  profiles: (userId: string) => `${PROJECT_ROOT}/profiles/${userId}`,
  idDocuments: (userId: string) => `${PROJECT_ROOT}/id-documents/${userId}`,
  tradeEvidence: (tradeId: string, userId: string) => `${PROJECT_ROOT}/trade-evidence/${tradeId}/${userId}`,
} as const;

export type UploadFolderType = keyof typeof FOLDERS;

// GENERATE UPLOAD SIGNATURE

export async function generateUploadSignature(folder: string) {
  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    timestamp,
    folder,
    allowed_formats: 'jpg, png, jpeg, webp',
    max_bytes: 5_000_000,
  }

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  )

  return {
    signature,
    timestamp,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  }
}

// DELETE AN ASSET

export async function deleteAsset(publicId: string): Promise<void> {
  if (!publicId.startsWith(`${PROJECT_ROOT}/`)) {
    throw new Error(`Refused to delete asset outside ${PROJECT_ROOT}/ namespace: ${publicId}`)
  }
  await cloudinary.uploader.destroy(publicId);
}

// GENERATE SIGNED DELIVERY URL

export function generateSignedDeliveryUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    sign_url: true,
    type: 'authenticated',
    expires_at: Math.floor(Date.now() / 1000) + 300,
  })
}