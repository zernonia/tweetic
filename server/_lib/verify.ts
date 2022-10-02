import { CompatibilityEvent } from "h3"

export const verify = (event: CompatibilityEvent) => {
  const { authorization } = useRequestHeaders()
  const { isDev, TWITTER_API_SECRET_KEY } = useRuntimeConfig()
  
  if (!isDev && authorization !== `Bearer ${TWITTER_API_SECRET_KEY}`) {
    event.res.statusCode = 401
    throw new Error("Not authorized");
  }
}
