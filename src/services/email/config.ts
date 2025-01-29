import { resendAdapter } from '@payloadcms/email-resend'

import type { Config } from 'payload'

export const emailAdapter: Config['email'] = resendAdapter({
  apiKey: process.env.RESEND_API_KEY || '',
  defaultFromName: process.env.RESEND_FROM_NAME || '',
  defaultFromAddress: process.env.RESEND_FROM_EMAIL || ''
})
