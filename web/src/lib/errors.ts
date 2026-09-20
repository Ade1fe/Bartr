import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AuthError } from "./auth";


export function handleApiError(error: unknown) {
  console.error('[API ERROR]', error);

  if (error instanceof ZodError) {
    return NextResponse.json({ error: 'Validation failed', details: error.flatten() }, { status: 400 });
  }

  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}


export class AppError extends Error {
  constructor(public message: string, public status: 400 | 401 | 403 | 404 | 500) {
    super(message);
    this.name = 'AppError';
 }
}