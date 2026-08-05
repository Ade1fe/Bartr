// src/app/(auth)/verify-email/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { clientAuth } from '@/lib/firebase-client'
import { MailCheck } from 'lucide-react'
import { toast } from 'sonner'
import Loader from '@/components/loader'

const CODE_LENGTH = 6
const RESEND_COOLDOWN_SECONDS = 60

export default function VerifyEmailPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [verifying, setVerifying] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const user = clientAuth.currentUser
    if (!user) {
      router.push('/auth')
      return
    }
    setEmail(user.email)
    sendCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  async function sendCode() {
    setSending(true)
    setError(null)
    try {
      const token = await clientAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Not authenticated')

      const res = await fetch('/api/email/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: clientAuth.currentUser?.email }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to send code')
      }

      setCooldown(RESEND_COOLDOWN_SECONDS)
      toast.success('Code sent, check your inbox')
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to send code')
    } finally {
      setSending(false)
    }
  }

  function handleDigitChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return

    const next = [...digits]
    next[index] = value.slice(-1)
    setDigits(next)
    setError(null)

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (next.every(d => d !== '')) {
      handleVerify(next.join(''))
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!pasted) return
    const next = Array(CODE_LENGTH).fill('')
    pasted.split('').forEach((char, i) => { next[i] = char })
    setDigits(next)
    if (pasted.length === CODE_LENGTH) {
      handleVerify(pasted)
    } else {
      inputRefs.current[pasted.length]?.focus()
    }
  }

  async function handleVerify(code: string) {
    setVerifying(true)
    setError(null)
    try {
      const token = await clientAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Not authenticated')

      const res = await fetch('/api/email/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ otp: code }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Incorrect code')
        setDigits(Array(CODE_LENGTH).fill(''))
        inputRefs.current[0]?.focus()
        return
      }

      // The `otpVerified` custom claim was just set server-side, but the
      // client's current ID token was minted before that happened — it
      // won't carry the claim until forced to refresh. `true` here forces
      // Firebase to fetch a brand new token rather than reuse the cached one.
      await clientAuth.currentUser?.getIdToken(true)
      const freshToken = await clientAuth.currentUser?.getIdToken()

      // Re-mint the session cookie from that fresh token so proxy.ts sees
      // otpVerified: true on the very next request, not after an hour.
      const sessionRes = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${freshToken}`,
        },
      })

      if (!sessionRes.ok) {
        throw new Error('Verified, but failed to refresh your session. Please try signing in again.')
      }

      const { onboardingComplete } = await sessionRes.json();

      toast.success('Email verified')

      if (!onboardingComplete) {
        router.push('/onboarding/listings')
      }
      else {
        router.push('/dashboard');
      }

    }
    catch (err: any) {
      setError(err.message ?? 'Verification failed');
      toast.error(err.message ?? 'Verification failed');
    }
    finally {
      setVerifying(false)
    }
  }

  return (
    <div className="flex items-center justify-center px-4">
      {verifying && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-[1px]'>
          <Loader type="bars" color="#A5B6B1" height={30} width={30} />
        </div>
      )}
      <Card className="w-full max-w-md rounded-2xl shadow-xs border-neutral-100 px-4 py-8">
        <CardHeader className="p-0 text-center mb-6">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#86B7A9]/10 flex items-center justify-center">
            <MailCheck className="h-6 w-6 text-[#86B7A9]" />
          </div>
          <CardTitle className="text-xl font-medium text-neutral-900">Check your email</CardTitle>
          <CardDescription className="text-sm text-neutral-500 mt-2">
            We sent a 6-digit code to{' '}
            <span className="font-medium text-neutral-700">{email ?? 'your email address'}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input key={i} ref={el => { inputRefs.current[i] = el }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={e => handleDigitChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} disabled={verifying} className="h-14 w-11 text-center text-xl font-semibold rounded-lg border border-neutral-200 text-neutral-900 outline-none focus:ring-2 focus:ring-[#86B7A9] focus:border-transparent transition-shadow disabled:opacity-50" />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md mt-4 text-center">
              {error}
            </p>
          )}

          {verifying && (
            <p className="text-sm text-neutral-400 text-center mt-4">Verifying...</p>
          )}
        </CardContent>

        <CardFooter className="p-0 mt-8 flex flex-col gap-3">
          <Button type="button" variant="outline" className="w-full h-11 border-neutral-200 text-neutral-600 shadow-none" onClick={sendCode} disabled={sending || cooldown > 0} >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : sending ? 'Sending...' : 'Resend code'}
          </Button>
          <p className="text-xs text-neutral-400 text-center">
            Entered the wrong email? <a href="/auth" className="underline text-neutral-600">Start over</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}