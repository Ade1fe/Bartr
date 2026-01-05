"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useState } from "react";

export default function Page() {

  return (
    <Card className="rounded-lg shadow-xs ring-0 border-neutral-100 px-4 py-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="font-normal text-2xl font-outfit text-neutral-600">
          Create Your Account
        </CardTitle>
        <CardDescription className="font-normal text-sm font-outfit text-neutral-600">
          Tell us about yourself and what you're looking to trade
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 p-0 mb-8">
        <FieldSet>
          <FieldGroup>
              <Field className="grid gap-3">
                <FieldLabel htmlFor="location" className="text-neutral-600">
                  Location
                </FieldLabel>
                <Input id="location" placeholder="you@example.com" type="email" className="text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600" />
              </Field>
            <Field></Field>
            <Field></Field>
            <Field></Field>
            <Field></Field>
          </FieldGroup>
        </FieldSet>
        <div className="grid md:grid-cols-2 gap-2">
          <Field className="grid gap-3">
            <FieldLabel htmlFor="bio" className="text-neutral-600">
              Bio
            </FieldLabel>
            <Textarea
              id="bio"
              placeholder="Tell others about yourself..."
              className="text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600"
            />
          </Field>
          <div className="grid gap-3">
            <Label htmlFor="lastName" className="text-neutral-600">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Duarte"
              className="text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600"
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phoneNumber" className="text-neutral-600">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            placeholder="+1 (5555) 000-0000"
            type="tel"
            className="text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password" className="text-neutral-600">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            className="text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600"
          />
        </div>
      </CardContent>
      <CardFooter className="grid gap-6 w-full p-0">
        <div className="flex items-center gap-1">
          <Checkbox
            id="agreeTerms"
            className="cursor-pointer border-neutral-400"
          />
          <Label htmlFor="agreeTerms" className="text-neutral-600">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
        <Button className="rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
