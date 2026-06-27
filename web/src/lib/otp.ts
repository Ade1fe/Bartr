import crypto from 'crypto';

const OTP_SECRET = process.env.OTP_SECRET!;
const OTP_LENGTH = 6;

export const MAX_ATTEMPTS = 5;
export const OTP_EXPIRY_MINUTES = 10;

export function generateOtp(): string {
  const bytes = crypto.randomBytes(3);
  const num = bytes.readUIntBE(0, 3) % 1_000_000;
  return num.toString().padStart(OTP_LENGTH, '0')
}

export function hashOtp(otp: string): string {
  return crypto.createHmac('sha256', OTP_SECRET).update(otp).digest('hex');
}

export function otpExpiresAt(): string {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString()
}

export function isOtpExpired(expiresAt: string): boolean {
  return new Date() > new Date(expiresAt)
}

export function verifyOtpHash(inputOtp: string, storedHash: string): boolean {
  const inputHash = hashOtp(inputOtp);
  try {
    return crypto.timingSafeEqual(Buffer.from(inputHash, 'hex'), Buffer.from(storedHash, 'hex'))
  }
  catch {
    return false;
  }
}