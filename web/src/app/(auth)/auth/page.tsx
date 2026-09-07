// app/(auth)/auth/page.tsx
"use client";

import SignInForm from "@/components/auth/signInForm";
import SignUpForm from "@/components/auth/signUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const reasonMessages: Record<string, string> = {
  unauthenticated: 'Please sign in to continue.',
  emailNotVerified: 'Please verify your email to continue.',
  session_expired: 'Your session has expired. Please sign in again.',
}

function RedirectReasonToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const reason = searchParams.get('reason');
    if (reason && reasonMessages[reason]) {
      const message = reasonMessages[reason];
      toast.error(message);
      router.replace('/auth');
    }
  }, [searchParams, router]);

  return null;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");

  return (
    <>
      <Suspense fallback={null}>
        <RedirectReasonToast />
      </Suspense>
      
      <Tabs defaultValue="signIn" value={activeTab} onValueChange={(value: string) => { if ( value === "signIn" || value === "signUp" ) { setActiveTab(value); } }} className="w-full items-center gap-3" >
        <TabsList className="grid items-center justify-center w-full grid-cols-2 py-0.5 px-1 rounded-xl bg-neutral-200 gap-1 lg:gap-3 text-sm">
          <TabsTrigger value="signIn" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-neutral-600 text-neutral-600 text-sm font-medium cursor-pointer transition-all ease-in-out duration-150" >
            <span>Sign In</span>
          </TabsTrigger>
          <TabsTrigger value="signUp" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-neutral-600 text-neutral-600 text-sm font-medium cursor-pointer transition-all ease-in-out duration-150" >
            <span>Sign Up</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signIn" className="w-full border-0 flex flex-col gap-6 transition-all ease-in-out duration-150" >
          <SignInForm />
        </TabsContent>

        <TabsContent value="signUp" className="w-full border-0 flex flex-col gap-6 transition-all ease-in-out duration-150" >
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
