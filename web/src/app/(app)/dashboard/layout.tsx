// src/app/(app)/dashboard/layout.tsx
import "@/app/globals.css";
import { requireSession } from "@/lib/require-session";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  return <>{children}</>;
}