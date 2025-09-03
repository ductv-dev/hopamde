export const env = {
  OPENAI_API_KEY:
    typeof process !== 'undefined'
      ? (process.env.OPENAI_API_KEY as string)
      : '',
  GOOGLE_CLIENT_ID:
    typeof process !== 'undefined'
      ? (process.env.GOOGLE_CLIENT_ID as string)
      : '',
  GOOGLE_CLIENT_SECRET:
    typeof process !== 'undefined'
      ? (process.env.GOOGLE_CLIENT_SECRET as string)
      : '',
  API_URL:
    typeof process !== 'undefined'
      ? (process.env.NEXT_PUBLIC_API_URL as string)
      : '',
  GEMINI_API_KEY:
    typeof process !== 'undefined'
      ? (process.env.GEMINI_API_KEY as string)
      : '',
  APP_URL:
    typeof process !== 'undefined'
      ? (process.env.NEXT_PUBLIC_APP_URL as string)
      : '',
  GA_CODE:
    typeof process !== 'undefined' ? (process.env.GA_CODE as string) : '',
  GA_PROPERTY_ID:
    typeof process !== 'undefined'
      ? (process.env.GA_PROPERTY_ID as string)
      : '',
  GA_CLIENT_EMAIL:
    typeof process !== 'undefined'
      ? (process.env.GA_CLIENT_EMAIL as string)
      : '',
  GA_PRIVATE_KEY:
    typeof process !== 'undefined'
      ? (process.env.GA_PRIVATE_KEY as string)
      : '',
  POSTHOG_KEY:
    typeof process !== 'undefined'
      ? (process.env.NEXT_PUBLIC_POSTHOG_KEY as string)
      : '',
  POSTHOG_HOST:
    typeof process !== 'undefined'
      ? (process.env.NEXT_PUBLIC_POSTHOG_HOST as string)
      : '',
  POST_URL:
    typeof process !== 'undefined'
      ? (process.env.NEXT_PUBLIC_POST_URL as string)
      : '',
};
