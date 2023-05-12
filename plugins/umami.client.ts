import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const moduleOptions = {
    scriptUrl: "https://umami-zernonia.vercel.app/umami.js",
    websiteId: "91452ea0-c879-4497-8bf0-0dd74ee96bb8",
    domains: "tweetic.zernonia.com",
  };
  const options = { ...moduleOptions };

  loadScript(options);
});

function loadScript(options: any) {
  const head = document.head || document.getElementsByTagName("head")[0];
  const script = document.createElement("script");

  script.async = true;
  script.defer = true;
  script.dataset.websiteId = options.websiteId;
  script.dataset.domains = options.domains;
  script.src = options.scriptUrl;

  head.appendChild(script);
}
