'use client';
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

export default function SignInForm() {
  return (
    <Card className='rounded-lg shadow-xs ring-0 border-neutral-100 px-4 py-8'>
      <CardHeader className='p-0 mb-8'>
        <CardTitle className='font-normal text-2xl font-outfit text-neutral-600'>Welcome Back</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-0 mb-8">
        <div className="grid gap-3">
          <Label htmlFor="email" className='text-neutral-600'>Email</Label>
          <Input id="email" placeholder="Pedro Duarte" type='email' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password" className='text-neutral-600'>Password</Label>
          <Input id="password" placeholder="@peduarte" type='password' className='text-[0.813rem] md:text-sm border-neutral-100 ring-0! ring-offset-0! outline-none! focus:ring-0! focus:ring-offset-0! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:outline-none! shadow-xs text-neutral-600' />
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
        <Button className='rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm px-3 lg:px-5'>Sign In</Button>
      </CardFooter>
    </Card>
  )
}