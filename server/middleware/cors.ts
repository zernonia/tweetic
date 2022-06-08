export default defineEventHandler(async (event) => {
  event.res.setHeader("Access-Control-Allow-Origin", "*")
})
