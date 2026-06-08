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
import { MapPin, CloudUpload, CheckCircle2, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

export default function SignUpForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [verificationPhoto, setVerificationPhoto] = useState<File | null>(null);
  const [verificationId, setVerificationId] = useState<File | null>(null);

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

  const handleFileSelect = ( event: React.ChangeEvent<HTMLInputElement>,  setter: React.Dispatch<React.SetStateAction<File | null>> ) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  const handleDrop = ( event: React.DragEvent<HTMLDivElement>, setter: React.Dispatch<React.SetStateAction<File | null>> ) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setter(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };


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
                <FieldLabel htmlFor="profile-photo" className='text-neutral-600'>Profile Photo</FieldLabel>
                <Input type="file" id="profile-photo" accept="image/png, image/jpeg" className="hidden" onChange={(e) => handleFileSelect(e, setProfilePhoto)} />
                {!profilePhoto ? (
                  <Empty id='profile-photo' onDrop={(e) => handleDrop(e, setProfilePhoto)} onDragOver={handleDragOver} onClick={() => document.getElementById('profile-photo')?.click()} className="border border-dashed border-neutral-200 text-neutral-600 transition-colors cursor-pointer">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <CloudUpload />
                      </EmptyMedia>
                      <EmptyTitle className='text-sm'>Click to upload or drag and drop</EmptyTitle>
                      <EmptyDescription className='text-xs'>
                        PNG, JPG up to 5MB
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )
                :
                (
                  <div className="border-2 border-neutral-200 rounded-lg p-4 bg-neutral-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-neutral-700">{profilePhoto.name}</p>
                        <p className="text-xs text-neutral-500">
                          {(profilePhoto.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setProfilePhoto(null); }} >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Field>

              <Field className="grid gap-3">
                <div>
                  <FieldLabel htmlFor="verification" className='text-neutral-600'>Verification (Optional)</FieldLabel>
                  <span className='text-xs font-normal text-neutral-600'>Upload ID for verified badge</span>
                </div>
                <Input type="file" id="verification" accept="image/png, image/jpeg" className="hidden" onChange={(e) => handleFileSelect(e, setVerificationPhoto)} />
                {!verificationPhoto ? (
                  <Empty id='verification' onDrop={(e) => handleDrop(e, setVerificationPhoto)} onDragOver={handleDragOver} onClick={() => document.getElementById('verification')?.click()} className="border border-dashed border-neutral-200 text-neutral-600 transition-colors cursor-pointer">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <CloudUpload />
                      </EmptyMedia>
                      <EmptyTitle className='text-sm'>Upload government-issued ID</EmptyTitle>
                      <EmptyDescription className='text-xs'>
                        PNG, JPG up to 5MB
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )
                :
                (
                  <div className="border-2 border-neutral-200 rounded-lg p-4 bg-neutral-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-neutral-700">{verificationPhoto.name}</p>
                        <p className="text-xs text-neutral-500">
                          {(verificationPhoto.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setVerificationPhoto(null); }} >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
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