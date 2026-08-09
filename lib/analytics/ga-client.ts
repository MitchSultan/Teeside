import { BetaAnalyticsDataClient } from '@google-analytics/data'

export function getGAClient(): BetaAnalyticsDataClient | null {
  try {
    const projectId = process.env.GA_project_id || process.env.GA_PROJECT_ID
    const clientEmail = process.env.GA_client_email || process.env.GA_CLIENT_EMAIL
    let privateKey = process.env.GA_private_key || process.env.GA_PRIVATE_KEY

    if (!clientEmail || !privateKey) {
      console.warn('GA credentials missing in environment variables.')
      return null
    }

    // Replace escaped newlines if any
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n')
    }

    return new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      projectId: projectId,
    })
  } catch (error) {
    console.error('Failed to initialize GA Client:', error)
    return null
  }
}

export function getGAPropertyId(): string {
  const propertyId =
    process.env.GA_property_id || process.env.GA_PROPERTY_ID || '549130028'
  const cleanId = propertyId.replace(/^properties\//, '').trim()
  return `properties/${cleanId}`
}
