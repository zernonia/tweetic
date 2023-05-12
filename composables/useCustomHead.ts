export const useCustomHead = (title: string, description?: string, image?: string) => {
  useHead({
    title,
    meta: [
      { name: "description", content: description ?? "Convert Tweets to Static HTML | Free • Open Source" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@zernonia" },
      { name: "twitter:title", content: title },
      {
        name: "twitter:description",
        content: description ?? "Convert Tweets to Static HTML | Free • Open Source",
      },
      { name: "twitter:image", content: image ?? "https://tweetic.zernonia.com/og.png" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:url", content: "https://tweetic.zernonia.com" },
      { property: "og:image", content: image ?? "https://tweetic.zernonia.com/og.png" },
      {
        property: "og:description",
        content: description ?? "Convert Tweets to Static HTML | Free • Open Source",
      },
    ],
  });
};
