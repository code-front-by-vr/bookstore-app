'use client'

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {useState} from 'react'

export default function SubscribeSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="w-full bg-muted py-12 px-6 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
        <p className="text-muted-foreground mb-6 font-inter">
          Be the first to know about new IT books, upcoming releases, exclusive offers and more.
        </p>
        {submitted ? (
          <p className="text-green-600 font-medium font-inter">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
              className="flex-1 font-inter"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  )
}
