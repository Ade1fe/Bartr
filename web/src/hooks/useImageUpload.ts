'use client'

import { useState } from 'react'
import { clientAuth } from '@/lib/firebase-client'

interface UploadOptions {
  type: 'listings' | 'profiles' | 'idDocuments' | 'tradeEvidence'
  tradeId?: string
  onSuccess?: (url: string) => void
  onError?: (error: string) => void
}

interface UploadState {
  uploading: boolean
  progress: number
  error: string | null
  url: string | null
}

export function useImageUpload(options: UploadOptions) {
  const [state, setState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
    url: null,
  })

  async function upload(file: File): Promise<string | null> {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = 'Only JPG, PNG, and Webp images are allowed'
      setState(prev => ({ ...prev, error: errorMsg }))
      options.onError?.(errorMsg)
      return null
    }

    if (file.size > 5 * 1024 * 1024) {
      const errorMsg = 'Image must be smaller than 5MB'
      setState(prev => ({ ...prev, error: errorMsg }))
      options.onError?.(errorMsg)
      return null
    }

    setState({ uploading: true, progress: 0, error: null, url: null })

    try {
      // const currentUser = (clientAuth as any).currentUser;
      const { currentUser } = clientAuth;

      if (!currentUser) {
        throw new Error('You must be signed in to upload images')
      }

      const token = await currentUser?.getIdToken()
      if (!token) {
        throw new Error('You must be signed in to upload images')
      }

      const signRes = await fetch('/api/upload/sign', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: options.type,
          tradeId: options.tradeId,
        }),
      })

      if (!signRes.ok) {
        const errorData = await signRes.json()
        throw new Error(errorData.error ?? 'Failed to get upload signature')
      }

      const { timestamp, folder, api_key, cloud_name, upload_preset } = await signRes.json();

      if (!cloud_name) {
        throw new Error('Cloudinary cloud name is missing')
      }

      setState(prev => ({ ...prev, progress: 25 }))

      const formData = new FormData()
      formData.append('file', file)
      // formData.append('signature', signature)
      formData.append('timestamp', String(timestamp))
      formData.append('api_key', api_key)
      formData.append('folder', folder)
      formData.append('upload_preset', upload_preset)

      setState(prev => ({ ...prev, progress: 50 }))

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: formData,
      })

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json()
        throw new Error(errorData.error?.message ?? 'Cloudinary upload failed');
      }

      const uploadData = await uploadRes.json()
      const secureUrl: string = uploadData.secure_url

      setState({
        uploading: false,
        progress: 100,
        error: null,
        url: secureUrl,
      })

      options.onSuccess?.(secureUrl)

      return secureUrl
    }
    catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed unexpectedly';

      setState({
        uploading: false,
        progress: 0,
        error: errorMsg,
        url: null,
      })

      options.onError?.(errorMsg)
      return null
    }
  }

  function reset() {
    setState({ uploading: false, progress: 0, error: null, url: null })
  }

  return { upload, reset, uploading: state.uploading, progress: state.progress, error: state.error, url: state.url }
}