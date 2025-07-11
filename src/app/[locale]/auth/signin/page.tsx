'use client'

import {SignInForm} from '@/components/auth/sign-in-form'
import type {SignInFormType} from '@/schemas/auth-schema'

export default function SignInPage() {
  async function onSubmit(data: SignInFormType) {
    // TODO: API for sign in
    console.log('Sign in for:', data)
  }

  return <SignInForm onSubmit={onSubmit} />
}
