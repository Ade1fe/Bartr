'use client';

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export default function SignUpForm() {
  return (
    <Card className='rounded-lg shadow-xs ring-0 border-neutral-100 px-4 py-8'>
      <CardHeader className='p-0 mb-8'>
        <CardTitle className='font-normal text-2xl font-outfit text-neutral-600'>Create Your Account</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-0 mb-8">
        <div>
          <div className="grid gap-3">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="tabs-demo-current">Current password</Label>
          <Input id="tabs-demo-current" type="password" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="tabs-demo-new">New password</Label>
          <Input id="tabs-demo-new" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  )
}