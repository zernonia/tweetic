export default defineEventHandler(async (event) => {
  event.context.res?.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
});
