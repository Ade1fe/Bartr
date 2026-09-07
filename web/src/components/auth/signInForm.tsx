'use client';

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import Loader from "../loader";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);

      const token = await userCredential.user.getIdToken();
      const { creationTime, lastSignInTime } = userCredential.user.metadata;
      const isFirstSignIn = creationTime === lastSignInTime;

      const idTokenResult = await userCredential.user.getIdTokenResult();
      const otpVerified = idTokenResult.claims.otpVerified === true;

      const sessionRes = await fetch('/api/auth/session', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      

      if (!sessionRes.ok) {
        const data = await sessionRes.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to create session');
      }

      const { onboardingComplete } = await sessionRes.json();

      toast.success(isFirstSignIn ? "You're all set. Let's get trading." : "Good to see you again.");

      if (!otpVerified) {
        router.push('/verify-email');
      }
      else if (!onboardingComplete) {
        router.push('/onboarding/listings');
      }
      else {
        router.push('/dashboard');
      }
    }
    catch (err: any) {
      const errorMessage: Record<string, string> = {
        'auth/invalid-credential': 'Invalid email or password',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
        'auth/user-disabled': 'This account has been disabled',
      }
      const message = errorMessage[err.code] ?? err.message ?? 'Sign in failed. Please try again.'
      setError(message);
      toast.error(message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-[1px]'>
          <Loader type="bars" color="#A5B6B1" height={30} width={30} />
        </div>
      )}

      <Card className='rounded-lg shadow-xs ring-0 border-neutral-100 px-4 py-8'>
        <CardHeader className='p-0 mb-8'>
          <CardTitle className='font-normal text-2xl font-outfit text-neutral-600'>Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 p-0 mb-8">
          {error && (
            <p className='text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md'>
              {error}
            </p>
          )}
          <div className="grid gap-3">
            <Label htmlFor="email" className='text-neutral-600'>Email</Label>
            <Input id="email" placeholder="you@example.com" type='email' value={email} onChange={e => setEmail(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password" className='text-neutral-600'>Password</Label>
            <div className="relative">
              <Input id="password" placeholder="**********" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 cursor-pointer" >
                {showPassword ? ( <EyeClosed size={20} /> ) : ( <Eye size={20} /> )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-6 w-full p-0">
          <div className='items-center justify-between flex w-full p-0'>
            <div className="flex items-center gap-1">
              <Checkbox id="rememberMe" className='cursor-pointer border-neutral-400' />
              <Label htmlFor="rememberMe" className='text-neutral-600'>Remember me</Label>
            </div>
            <Link href='/forgotPassword' className='p-0 text-sm font-normal text-blue-600 hover:text-blue-800 underline underline-offset-2'>Forgot password?</Link>
          </div>
          <Button onClick={handleSubmit} disabled={loading || !email || !password} className='rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5'>{loading ? 'Signing in...' : 'Sign In'}</Button>
        </CardFooter>
      </Card>
    </>
  )
}