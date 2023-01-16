import { defu } from "defu";
import { TweetOptions, TweetQueryOptions, TweetSyndication } from "~~/utils/types";
import { constructHtml, getSyndication } from "../_lib/parser";
import { setResponseHeader } from "h3";

// Create Capture Group for twitter url.
const getTwitterId = (url: string): string | boolean => {
  // @see https://regex101.com/r/AAtIUu/1
  let match = url.match(/(https:\/\/twitter.com\/.*\/status\/)|([0-9]+)/g);
  if (match && match.length === 2) {
    return match[1];
  }
  return false;
};

const cachedData: { [key: string]: TweetSyndication } = {};

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Access-Control-Allow-Origin", "*");

  try {
    const query: TweetQueryOptions = getQuery(event);
    const { url, layout, css, enable_twemoji, show_media, show_quoted_tweet, show_info } = defu(query, {
      enable_twemoji: false,
      show_media: false,
      show_quoted_tweet: false,
      show_info: false,
    });

    if (!url) throw new Error("Invalid Twitter URL or not defined.");
    const id = getTwitterId(url);
    // Check valid twitter id
    if (typeof id !== "string") throw new Error("Invalid Twitter ID or not defined.");

    const options: TweetOptions = {
      layout: layout?.toString(),
      css: css?.toString(),
      enable_twemoji: JSON.parse(enable_twemoji.toString()),
      show_media: JSON.parse(show_media.toString()),
      show_quoted_tweet: JSON.parse(show_quoted_tweet.toString()),
      show_info: JSON.parse(show_info.toString()),
    };

    let data: TweetSyndication;
    if (cachedData[id]) {
      data = cachedData[id];
    } else {
      data = await getSyndication(id.toString());
      cachedData[id] = data;
    }
    const { html, meta } = constructHtml(data, options);
    return { html, meta };
  } catch (err) {
    return {};
  }
});
