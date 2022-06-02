import { load } from "cheerio"
import { TweetOptions, TweetContent } from "~~/interface"
import { mapClass } from "./reference"

export const constructHtml = async (data: TweetContent, options: TweetOptions, isQuotedTweet = false) => {
  const mapClassOptions = (key: string) => mapClass(key, options)

  const { meta, html: content, media_html, quoted_tweet } = data
  const quotedTweetHtml: string =
    options.show_quoted_tweet && !isQuotedTweet && quoted_tweet?.id
      ? await getQuotedTweetHtml(quoted_tweet.id, options)
      : ""

  const html = ` 
  <div class="${mapClassOptions("tweet")}" data-style="${options.layout}">
    <div class="${mapClassOptions("tweet-header")}">
      ${
        options.layout == "supabase"
          ? `<div class="${mapClassOptions("tweet-author")}">
        <svg class="${mapClassOptions(
          "tweet-logo"
        )}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"></path></svg>
        <img class="${mapClassOptions("tweet-author-image")}" src="${meta.avatar.normal}" >
        <div class="${mapClassOptions("tweet-author-info")}">
          <p class="${mapClassOptions("tweet-author-name")}"></p>
          <a class="${mapClassOptions("tweet-author-handler")}" target="_blank" href="${meta.profile_url}">@${
              meta.username
            }</a>
        </div>
      </div>`
          : `<div class="${mapClassOptions("tweet-author")}">
        <img class="${mapClassOptions("tweet-author-image")}" src="${meta.avatar.normal}" >
        <div class="${mapClassOptions("tweet-author-info")}">
          <p class="${mapClassOptions("tweet-author-name")}">${meta.name}</p>
          <a class="${mapClassOptions("tweet-author-handler")}" target="_blank" href="${meta.profile_url}">@${
              meta.username
            }</a>
        </div>
      </div>
      <svg class="${mapClassOptions(
        "tweet-logo"
      )}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"></path></svg>`
      }
    </div>
      
    <div class="${mapClassOptions("tweet-content")}">
      ${content}

      ${options.show_media && media_html ? media_html : ""}
      ${quotedTweetHtml ? `<div class="tweet-quoted">${quotedTweetHtml}</div>` : ""}
    </div>
  </div> 
  `
  return html
}

export const getTweetContent = async (id: string, options: TweetOptions) => {
  const htmlString = await $fetch<{ [key: string]: string }>(`https://syndication.twitter.com/tweets.json?ids=${id}`)

  let d = Object.values(htmlString)[0]
  const $ = load(d, {
    decodeEntities: false,
    xmlMode: false,
  })

  const container = $(".EmbeddedTweet-tweetContainer")

  if (!container.length) return

  const meta: TweetContent["meta"] = {}
  const content: TweetContent = { meta, html: "" }

  // This is the blockquote with the tweet
  const subject = container.find('[data-scribe="section:subject"]')

  // Tweet header with the author info
  const header = subject.children(".Tweet-header")
  const avatar = header.find('[data-scribe="element:avatar"]')
  const author = header.find('[data-scribe="component:author"]')
  const name = author.find('[data-scribe="element:name"]')
  const screenName = author.find('[data-scribe="element:screen_name"]')

  // Tweet body
  const tweet = subject.children('[data-scribe="component:tweet"]')
  const tweetContent = tweet.children("p")
  const card = tweet.children(".Tweet-card")
  const tweetInfo = tweet.children(".TweetInfo")
  const fullTimestamp = tweetInfo.find('[data-scribe="element:full_timestamp"]')
  const heartCount = tweetInfo.find('[data-scribe="element:heart_count"]')

  // Tweet footer
  const callToAction = container.children('[data-scribe="section:cta component:news"]')
  const profileText = callToAction.children('[data-scribe="element:profile_text"]')
  const conversationText = callToAction.children('[data-scribe="element:conversation_text"]')

  let quotedTweet: { id: string; url: string }
  let mediaHtml: string
  meta.id = subject.attr("data-tweet-id")
  meta.url = subject.attr("cite")
  meta.avatar = {
    normal: avatar.attr("data-src-1x"),
  }
  meta.name = name.text()
  meta.username = screenName.text().substring(1) // Omit the initial @
  meta.profile_url = "https://twitter.com/" + meta.username
  meta.created_at = new Date(fullTimestamp.attr("data-datetime")).getTime()
  meta.heart_count = heartCount.text()
  meta.cta_type = profileText.length ? "profile" : "conversation"

  if (conversationText.length) {
    // Get the formatted count and skip the rest
    meta.cta_count = conversationText.text().match(/^[^\s]+/)[0]
  }

  // If some text ends without a trailing space, it's missing a <br>
  tweetContent.contents().each(function () {
    const el = $(this)
    const type = el[0].type

    if (type !== "text") return

    const text = el.text()

    if (text.length && text.trim() === "") {
      if (el.next().children().length) {
        el.after($("<br>"))
      }
    } else if (!/\s$/.test(el.text()) && el.next().children().length && !/^[#@]/.test(el.next().text())) {
      el.after($("<br>"))
    }
  })

  card.children().each(function () {
    const props = this.attribs
    const scribe = props["data-scribe"]
    const el = $(this)

    if (scribe === "section:quote") {
      const tweetCard = el.children("a")
      const id = tweetCard.attr("data-tweet-id")
      const url = tweetCard.attr("href")

      quotedTweet = { id, url }
      return
    }

    const media = $("<div>").attr("class", "tweet-media")

    if (scribe === "component:card") {
      const photo = el.children('[data-scribe="element:photo"]')
      const photoGrid = el.children('[data-scribe="element:photo_grid"]')
      const photos = photo.length ? photo : photoGrid

      if (photos.length) {
        const images = photos.find("img")

        images.each(function () {
          const img = $(this)
          const alt = img.attr("alt")
          const url = img.attr("data-image")
          const format = img.attr("data-image-format")
          const height = img.attr("height")
          const width = img.attr("width")

          this.attribs = {
            class: "tweet-image",
            src: `${url}?format=${format}`,
            height,
            width,
          }
          if (alt) {
            this.attribs.alt = alt
          }
          // Move the media img to a new container
          media.append(img)
        })
      }

      const gif = el.find('[data-scribe="element:poster_image_link"]')
      if (gif.length) {
        let dataImage = gif.attr("data-image")
        let src = `https://video.twimg.com/tweet_video/${dataImage.split("tweet_video_thumb/")[1]}.mp4`
        media.append(`<video autoplay muted loop src="${src}"></video>`)
      }

      const summaryCard = el.find(".SummaryCard--large")
      if (summaryCard.length) {
        summaryCard.removeAttr("class").attr("target", "_blank")
        const image = summaryCard.find("img").removeAttr("class alt")
        const card_content = summaryCard.find(".SummaryCard-content").attr("class", "tweet-summary-card-text")

        card_content.children().each(function () {
          this.attribs = {}
        })
        // reposition last el to first
        card_content.children().last().insertBefore(card_content.children().first())

        summaryCard.empty().append(image).append(card_content)
        media.attr("class", "tweet-media tweet-summary-card").append(summaryCard)
      }
      mediaHtml = $("<div>").append(media).html()
    }
  })

  tweetContent.children("img").each(function () {
    const props = this.attribs
    if (!options.enable_twemoji) {
      const el = $(this)
      el.replaceWith(props.alt)
    }
    // Handle emojis inside the text
    if (props.class?.includes("Emoji--forText")) {
      this.attribs = {
        "data-type": "emoji-for-text",
        src: props.src,
        alt: props.alt,
        class:
          options.css === "tailwind"
            ? "inline-block align-text-bottom w-[1.2em] h-[1.2em] mr-[0.05em] ml-[0.1em]"
            : "emoji",
      }
      return
    }

    console.error("An image with the following props is not being handled:", props)
  })

  tweetContent.children("a").each(function () {
    const props = this.attribs
    const scribe = props["data-scribe"]
    const el = $(this)
    const asLink = (type: string) => {
      this.attribs = {
        "data-type": type,
        href: props.href,
        target: "_blank",
        class: options.css == "tailwind" ? "text-blue-400" : "tweet-content-link",
      }
      if (type === "url") {
        el.children(".u-hiddenVisually").remove()
        return
      }
      el.text(el.text())
      return
    }

    // @mention
    if (scribe === "element:mention") {
      asLink("mention")
    }

    // #hashtag
    if (scribe === "element:hashtag") {
      // A hashtag may be a $cashtag too
      const type = props["data-query-source"] === "cashtag_click" ? "cashtag" : "hashtag"
      asLink(type)
    }

    if (scribe === "element:url") {
      const quotedTweetId = props["data-tweet-id"]
      // Remove link to quoted tweet to leave the card only
      if (quotedTweetId && quotedTweetId === quotedTweet?.id) {
        el.remove()
        return
      }

      asLink("url")
    }
  })

  content.html = tweetContent.html()

  if (quotedTweet) content.quoted_tweet = quotedTweet
  if (mediaHtml) content.media_html = mediaHtml

  return { content, htmlString }
}

const getQuotedTweetHtml = async (id: string, options: TweetOptions) => {
  const { content } = await getTweetContent(id, options)
  return constructHtml(content, options, true)
}
