'use client'

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {EmailSchema, EmailFormType} from '@/schemas/common/email-schema'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

export default function SubscribeSection() {
  const [submitted, setSubmitted] = useState(false)
  const t = useTranslations('subscribeSection')

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<EmailFormType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: EmailFormType) {
    setSubmitted(true)
  }

  return (
    <section className="w-full bg-muted py-8 sm:py-12 px-3 sm:px-6 flex justify-center rounded-lg">
      <div className="w-full max-w-xs sm:max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/20 p-4 sm:p-8 text-center border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">{t('title')}</h2>
        <p className="text-muted-foreground mb-4 sm:mb-6 font-inter text-sm sm:text-base">
          {t('description')}
        </p>
        {submitted ? (
          <p className="text-green-600 dark:text-green-400 font-medium font-inter text-sm sm:text-base">
            {t('success')}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Input
              type="email"
              placeholder={t('email')}
              {...register('email')}
              className="flex-1 font-inter text-sm sm:text-base"
            />
            <Button type="submit" className="text-sm sm:text-base">
              {t('button')}
            </Button>
            {errors.email && (
              <p className="text-red-500 font-inter text-sm sm:text-base">{errors.email.message}</p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
