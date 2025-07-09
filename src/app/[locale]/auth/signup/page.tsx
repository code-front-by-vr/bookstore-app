'use client'

import {SignUpForm} from '@/components/auth/sign-up-form'
import type {SignUpFormType} from '@/schemas/auth-schema'

export default function SignUpPage() {
  async function handleSignUp(data: SignUpFormType) {
    // TODO: API for sign up
    console.log('Sign up for:', data)
  }

  return <SignUpForm onSubmit={handleSignUp} />
}
