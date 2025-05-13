import Vapi from '@vapi-ai/web'

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY as string, process.env.NEXT_PUBLIC_VAPI_API_BASE_URL as string, {})
    