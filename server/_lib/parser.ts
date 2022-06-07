import { TweetOptions, TweetContent, TweetSyndication } from "~~/utils/types"
import { mapClass } from "./reference"
import Twemoji from "twemoji"

export const constructHtml = (data: TweetSyndication, options: TweetOptions, isQuotedTweet = false) => {
  try {
    const mapClassOptions = (key: string) => mapClass(key, options)

    const { meta, html: content, user, media_html, card_html, quoted_tweet } = getTweetContent(data, options)
    const quoted_html = getQuotedHtml(quoted_tweet as any, options)
    const tweet_class = isQuotedTweet
      ? mapClassOptions("tweet").replace("w-[400px]", "").replace("w-[500px]", "").concat(" mt-4")
      : mapClassOptions("tweet")

    const html: string = ` 
  <div class="${tweet_class} " data-style="${options.layout}">
    <div class="${mapClassOptions("tweet-header")}">
      ${
        options.layout == "supabase"
          ? `<div class="${mapClassOptions("tweet-author")}">
        <svg class="${mapClassOptions(
          "tweet-logo"
        )}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"></path></svg>
        <img class="${mapClassOptions("tweet-author-image")}" src="${user.profile_image_url_https}" >
        <div class="${mapClassOptions("tweet-author-info")}">
          <p class="${mapClassOptions("tweet-author-name")}"></p>
          <a class="${mapClassOptions("tweet-author-handler")}" target="_blank" href="https://twitter.com/${
              user.screen_name
            }">@${user.screen_name}</a>
          </div>
          </div>`
          : `<div class="${mapClassOptions("tweet-author")}">
          <img class="${mapClassOptions("tweet-author-image")}" src="${user.profile_image_url_https}" >
            <div class="${mapClassOptions("tweet-author-info")}">
              <div class="${mapClassOptions("tweet-author-title")}"
                <p class="${mapClassOptions("tweet-author-name")}">${user.name}</p>
                ${
                  !user.verified
                    ? `<svg class="${mapClassOptions(
                        "tweet-author-verified"
                      )}" viewBox="0 0 24 24"><g><path fill="currentColor" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>`
                    : ""
                }
              </div>
              <a class="${mapClassOptions("tweet-author-handler")}" target="_blank" href="https://twitter.com/${
              user.screen_name
            }">@${user.screen_name}
              </a>
            </div>
      </div>
      <svg class="${mapClassOptions(
        "tweet-logo"
      )}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"></path></svg>`
      }
    </div>
      
    <div class="${mapClassOptions("tweet-content")}">
      ${content}
      ${options.show_media ? media_html : ""}
      ${options.show_media ? card_html : ""}
      ${options.show_quoted_tweet ? quoted_html : ""} 
    </div>
  </div> 
  `
    return { html, meta }
  } catch (err) {
    throw err
  }
}

export const getSyndication = async (id: string) => {
  return await $fetch<TweetSyndication>(`https://cdn.syndication.twimg.com/tweet?id=${id}`)
}

export const getTweetContent = (data: TweetSyndication, options: TweetOptions) => {
  try {
    const { entities, user, card, text, quoted_tweet, photos, video } = data
    let html = text

    const meta = {
      user_id: user.id_str,
      name: user.name,
      screen_name: user.screen_name,
      verified: user.verified,
      profile_image_url_https: user.profile_image_url_https,
      url: "https://twitter.com/" + user.screen_name + "/status/" + data.id_str,
      profile_url: "https://twitter.com/" + user.screen_name,
      created_at: data.created_at,
      favorite_count: data.favorite_count,
      conversation_count: data.conversation_count,
    }

    const linkClass = options.css == "tailwind" ? "text-blue-400" : "tweet-content-link"
    entities.urls?.forEach((i) => {
      html = html.replace(
        i.url,
        i.display_url.includes("twitter.com")
          ? ""
          : `<a class="${linkClass}" href="${i.url}" target="_blank">${i.display_url}</a>`
      )
    })
    entities.media?.forEach((i) => {
      html = html.replace(i.url, "")
    })
    entities.hashtags?.forEach((i) => {
      html = html.replace(
        `#${i.text}`,
        `<a class="${linkClass}" href="https://twitter.com/hashtag/${i.text}" target="_blank">#${i.text}</a>`
      )
    })
    entities.user_mentions?.forEach((i) => {
      html = html.replace(
        `@${i.screen_name}`,
        `<a class="${linkClass}"  href="https://twitter.com/${i.screen_name}" target="_blank">@${i.screen_name}</a>`
      )
    })
    html = html.replace(/\n/g, "<br />")

    if (options.enable_twemoji) {
      html = Twemoji.parse(html, {
        folder: "svg",
        ext: ".svg",
        className:
          options.css === "tailwind"
            ? "inline-block align-text-bottom w-[1.2em] h-[1.2em] mr-[0.05em] ml-[0.1em]"
            : "emoji",
      })
    }

    let card_html = ""
    const mediaClass =
      options.css == "tailwind" ? "border border-gray-200 rounded-2xl mt-4 overflow-hidden" : "tweet-media"

    if (card?.name === "summary" || card?.name === "summary_large_image") {
      html.replace(card.url, "")
      card_html =
        options.css === "tailwind"
          ? `
        <a href="${card.url}" target="_blank">
          <div class="${mediaClass}">
            <img src="${card.binding_values.thumbnail_image_large.image_value.url}" >
            <div class="border-t border-gray-200 text-gray-300 text-[0.95rem] p-3">
              <span class="text-[0.9rem]">${card.binding_values.vanity_url.string_value}</span>
              <h2 class="text-black leading-relaxed my-0.5">${card.binding_values.title.string_value}</h2>
              <p class="leading-snug">${card.binding_values.description.string_value}</p>
            </div>
          </div>
        </a>`
          : `
        <a href="${card.url}" target="_blank">
          <div class="${mediaClass}">
            <img src="${card.binding_values.thumbnail_image_large.image_value.url}" >
            <div class="tweet-summary-card-text">
              <span>${card.binding_values.vanity_url.string_value}</span>
              <h2>${card.binding_values.title.string_value}</h2>
              <p>${card.binding_values.description.string_value}</p>
            </div>
          </div>
        </a>`
    }

    let media_html = ""
    if (photos) {
      media_html = `<div class="${mediaClass}">`
      photos.map((photo) => {
        media_html += `<img style="width: 100%" class="tweet-image" src="${photo.url}">`
      })
      media_html += `</div>`
    }
    if (video) {
      const mp4 = video.variants.find((i) => i.type === "video/mp4")
      media_html = `
    <div class="${mediaClass}">
      <video style="width: 100%" autoplay muted loop src="${mp4.src}"></video> 
    </div>`
    }

    return {
      meta,
      html,
      user,
      card_html,
      media_html,
      quoted_tweet,
    }
  } catch (err) {
    throw err
  }
}

const getQuotedHtml = (data: TweetSyndication, options: TweetOptions) => {
  if (!data) return ""

  const url = `https://twitter.com/${data.user.screen_name}/status/${data.id_str}`
  return `<div class="tweet-quoted">
       ${constructHtml(data, options, true).html} 
    </div>`
}
