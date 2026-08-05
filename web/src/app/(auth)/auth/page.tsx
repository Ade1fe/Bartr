"use client";

import SignInForm from "@/components/auth/signInForm";
import SignUpForm from "@/components/auth/signUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");

  return (
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
  );
}
