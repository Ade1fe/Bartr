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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";
import { useImageUpload } from "@/hooks/useImageUpload";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

export default function SignUpForm() {
  const router = useRouter();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [verificationPhoto, setVerificationPhoto] = useState<File | null>(null);

  const profileUpload = useImageUpload({ type: 'profiles' });
  const idDocUpload = useImageUpload({ type: 'idDocuments' });

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (currentStep === 1) {
      if (!firstName || !lastName || !email || !password) {
        setError('Please fill in all required fields')
        return
      }
      if (!agreedToTerms) {
        setError('Please agree to the Terms of Service')
        return
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters')
        return
      }
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }


  async function handleCompleteRRegistration(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
      const user = userCredential.user

      
      let photoURL: string | null = null;
      if (profilePhoto) {
        photoURL = await profileUpload.upload(profilePhoto);
      }
      
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: photoURL ?? undefined,
      })

      let idDocumentUrl: string | null = null
      if (verificationPhoto) {
        idDocumentUrl = await idDocUpload.upload(verificationPhoto);
      }

      const token = await user.getIdToken();

      const createUserRes = await fetch('/api/users/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          location,
          bio,
          photoURL,
          idDocumentUrl,
        }),
      })

      if (!createUserRes.ok) {
        const errorData = await createUserRes.json();
        toast.error(errorData.error ?? 'Failed to create user profile');
        throw new Error(errorData.error ?? 'Failed to create user profile');
      }

      const sessionRes = await fetch('/api/auth/session', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!sessionRes.ok) {
        toast.error('Failed to create session');
        throw new Error('Failed to create session');
      }

      toast.success("Account created. Let's trade.");
      router.push('/')
    }
    catch (err: any) {
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/invalid-email': 'Please enter a valid email address',
        'auth/weak-password': 'Password must be at least 6 characters',
      }

      toast.error(errorMessages[err.code] ?? err.message ?? 'Registration failed. Please try again.')
      setError(errorMessages[err.code] ?? err.message ?? 'Registration failed. Please try again.')
    }
    finally {
      setLoading(false);
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
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        {currentStep === 1 && (
          <FieldSet>
            <FieldGroup>
              <Field className='grid md:grid-cols-2 gap-2'>
                <div className="grid gap-3">
                  <Label htmlFor="firstName" className='text-neutral-600'>First Name</Label>
                  <Input id="firstName" type="text" placeholder="Pedro" value={firstName} onChange={e => setFirstName(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName" className='text-neutral-600'>Last Name</Label>
                  <Input id="lastName" type="text" placeholder="Duarte" value={lastName} onChange={e => setLastName(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
                </div>
              </Field>

              <Field className="grid gap-3">
                <Label htmlFor="email" className='text-neutral-600'>Email</Label>
                <Input id="email" placeholder="you@example.com" type='email' value={email} onChange={e => setEmail(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              </Field>

              <Field className="grid gap-3">
                <Label htmlFor="phoneNumber" className='text-neutral-600'>Phone Number</Label>
                <Input id="phoneNumber" placeholder="+1 (5555) 000-0000" type='tel' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              </Field>

              <Field className="grid gap-3">
                <Label htmlFor="password" className='text-neutral-600'>Password</Label>
                <div className="relative">
                  <Input id="password" placeholder="**********" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 cursor-pointer" >
                    {showPassword ? ( <EyeClosed size={20} /> ) : ( <Eye size={20} /> )}
                  </button>
                </div>
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
                  <InputGroupInput placeholder="City, State" value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} className='text-[0.813rem] md:text-sm border-0 focus:border-0 focus-visible:border-0 outline-0 focus:outline-0 focus-visible:outline-0' />
                  <InputGroupAddon>
                    <MapPin size={16} />
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field className="grid gap-3">
                <FieldLabel htmlFor="bio" className='text-neutral-600'>Bio</FieldLabel>
                <Textarea id="bio" placeholder='Tell others about yourself...' value={bio} onChange={e => setBio(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600 resize-none row-span-12' />
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
            <Checkbox id="agreeTerms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked === true)} className='cursor-pointer border-neutral-400' />
            <Label htmlFor="agreeTerms" className='text-neutral-600'>I agree to the Terms of Service and Privacy Policy</Label>
          </div>
        )}
        {currentStep === 1 ? (
          <Button type='submit' onClick={() => handleNext()} className='rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5'>Continue</Button>
        )
        :
        (
          <div className='grid md:grid-cols-2 gap-2'>
            <Button type='button' onClick={handleBack} className='rounded-lg bg-white text-neutral-600 cursor-pointer shadow-neutral-300 shadow-xs hover:shadow-sm px-3 lg:px-5'>Back</Button>
            <Button type='submit' onClick={handleCompleteRRegistration} disabled={loading} className='rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5'>{loading ? 'Creating account...' : 'Complete Registration'}</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}