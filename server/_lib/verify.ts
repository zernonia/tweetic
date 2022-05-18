import { CompatibilityEvent } from "h3"

export const verify = (event: CompatibilityEvent) => {
  const { authorization } = event.req.headers
  let authorized = true
  if (process.env.NODE_ENV !== "development" && authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    event.res.statusCode = 401
    authorized = false
  }
  return authorized
}
