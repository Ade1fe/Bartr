'use client';

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { MapPin } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (currentStep < 2) {
      console.log('clicking next');
      setCurrentStep(currentStep + 1);
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <Card className='rounded-lg shadow-xs ring-0 border-neutral-100 px-4 py-8'>
      <CardHeader className='p-0 mb-8'>
        <CardTitle className='font-normal text-2xl font-outfit text-neutral-600'>Create Your Account</CardTitle>
        {currentStep === 2 && (
          <CardDescription className="font-normal text-base font-outfit text-neutral-600">
            Tell us about yourself and what you're looking to trade
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-6 p-0 mb-8">
        {currentStep === 1 && (
          <FieldSet>
            <FieldGroup>
              <Field className='grid md:grid-cols-2 gap-2'>
                <div className="grid gap-3">
                  <Label htmlFor="firstName" className='text-neutral-600'>First Name</Label>
                  <Input id="firstName" type="text" placeholder="Pedro" className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName" className='text-neutral-600'>Last Name</Label>
                  <Input id="lastName" type="text" placeholder="Duarte" className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
                </div>
              </Field>
              <Field className="grid gap-3">
                <Label htmlFor="email" className='text-neutral-600'>Email</Label>
                <Input id="email" placeholder="you@example.com" type='email' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              </Field>
              <Field className="grid gap-3">
                <Label htmlFor="phoneNumber" className='text-neutral-600'>Phone Number</Label>
                <Input id="phoneNumber" placeholder="+1 (5555) 000-0000" type='tel' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              </Field>
              <Field className="grid gap-3">
                <Label htmlFor="password" className='text-neutral-600'>Password</Label>
                <Input id="password" type="password" placeholder='**********' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              </Field>
            </FieldGroup>
          </FieldSet>
        )}

        {currentStep === 2 && (
          <FieldSet>
            <FieldGroup>
              <Field className='grid gap-3'>
                <FieldLabel htmlFor="location" className='text-neutral-600'>Location</FieldLabel>
                <InputGroup id="location" className='border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600'>
                  <InputGroupInput placeholder="City, State" className='text-[0.813rem] md:text-sm border-0 focus:border-0 focus-visible:border-0 outline-0 focus:outline-0 focus-visible:outline-0' />
                  <InputGroupAddon>
                    <MapPin size={16} />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field className="grid gap-3">
                <FieldLabel htmlFor="bio" className='text-neutral-600'>Bio</FieldLabel>
                <Textarea id="bio" placeholder='Tell others about yourself...' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600 resize-none row-span-12' />
              </Field>
              <Field className="grid gap-3">
                <FieldLabel htmlFor="phoneNumber" className='text-neutral-600'>Phone Number</FieldLabel>
                <Input id="phoneNumber" placeholder="+1 (5555) 000-0000" type='tel' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              </Field>
              <Field className="grid gap-3">
                <FieldLabel htmlFor="password" className='text-neutral-600'>Password</FieldLabel>
                <Input id="password" type="password" placeholder='**********' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              </Field>
            </FieldGroup>
          </FieldSet>
        )}
      </CardContent>
      <CardFooter className="grid gap-6 w-full p-0">
        {currentStep === 1 && (
          <div className="flex items-center gap-1">
            <Checkbox id="agreeTerms" className='cursor-pointer border-neutral-400' />
            <Label htmlFor="agreeTerms" className='text-neutral-600'>I agree to the Terms of Service and Privacy Policy</Label>
          </div>
        )}
        {currentStep === 1 ? (
          <Button type='submit' onClick={() => handleNext()} className='rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5'>Continue</Button>
        )
        :
        (
          <div className='grid md:grid-cols-2 gap-2'>
            <Button type='button' onClick={() => handleBack()} className='rounded-lg bg-white text-neutral-600 cursor-pointer shadow-neutral-300 shadow-xs hover:shadow-sm px-3 lg:px-5'>Back</Button>
            <Button type='submit' onClick={() => handleNext()} className='rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5'>Complete Registration</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}