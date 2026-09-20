export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Something went wrong';
}

export function getFirebaseErrorCode(err: unknown): string | undefined {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const code = (err as Record<string, unknown>).code;
    return typeof code === 'string' ? code : undefined;
  }
  return undefined;
}