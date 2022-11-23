export default defineEventHandler(async (event) => {
  event.context.res?.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate");
});
