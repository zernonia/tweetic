import { TweetOptions, ExportOptions } from "./types"

export const obtainCss = (tweetOptions: TweetOptions) => {
  if (tweetOptions.css == "tailwind") return ""
  let style = `<style> 
  :root {
    --border: rgb(234, 234, 234);
    --bg-primary: white;
    --text-primary: rgb(35 35 35);
    --text-secondary: rgb(31, 155, 240);
  } 
  body { font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";}
  h1, h2, h4, hr, p { margin: 0 }
  a { color: inherit; text-decoration: inherit; }
  `

  if (tweetOptions.layout == "supabase") {
    style += `
  .tweet {
    width: 400px;
    padding: 2rem;
    color: var(--text-primary);
    border: 1px solid var(--border);
    border-radius: 1rem;
    background: var(--bg-primary);
  }
  .tweet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tweet-author {
    display: flex;
    position: relative;
    align-items: center;
  }
  .tweet-author-image {
    width: 48px;
    height: 48px;
    border-radius: 9999px;
  }
  .tweet-author-info {
    margin-left: 1rem;
  }
  .tweet-author-name {
    line-height: 1rem;
    font-weight: 500;
  }
  .tweet-author-handler {
    line-height: 1.8rem;
    color: var(--text-secondary);
  }
  .tweet-logo {
    color: var(--text-secondary);
    width: 20px;
    height: 20px;
    position: absolute;
    top: -4px;
    left: -8px;
    background: var(--text-secondary);
    color: var(--bg-primary);
    border-radius: 9999px;
    padding: 0.2rem;
  }
  .tweet-content {
    margin-top: 1rem;
  }
  .tweet-content a {
    color: var(--text-secondary);
  }
  .tweet-content .emoji {
    display: inline-block;
    height: 1.2em;
    width: 1.2em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }
  .tweet-media {
    margin-top: 1rem;
    border: 1px solid var(--border);
    border-radius: 1rem;
    overflow: hidden;
  }
  .tweet-summary-card-text {
    border-top: 1px solid var(--border);
    padding: 0.75rem;
    font-size: 0.95rem;
    color: var(--subtext-primary);
  }
  .tweet-summary-card-text span {
    font-size: 0.9rem;
  }
  .tweet-summary-card-text h2 {
    color: var(--text-primary);
  }
  .tweet-summary {
    display: flex;
  }
  .tweet-summary img {
    width: 130px;
    height: 130px;
  }
  .tweet-summary > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid var(--border);
    border-top: 0px !important;
  }

  .tweet-image {
    width: 100%;
  }
  .tweet-quoted .tweet {
    margin-top: 1rem;
    width: 100%;
  }`
  } else {
    style += `
  .tweet {
    width: 500px;
    padding: 2rem;
    color: var(--text-primary);
    border: 1px solid var(--border);
    border-radius: 1rem;
    background: var(--bg-primary);
  }
  .tweet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tweet-author {
    display: flex;
    align-items: center;
  }
  .tweet-author-title {
    display: flex;
    align-items: center;
  }
  .tweet-author-image {
    width: 48px;
    height: 48px;
    border-radius: 9999px;
  }
  .tweet-author-info {
    margin-left: 1rem;
  }
  .tweet-author-name {
    line-height: 1rem;
    font-weight: 500;
  }
  .tweet-author-verified {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.25rem;
    color: var(--text-secondary);
  }
  .tweet-author-handler {
    line-height: 1.8rem;
    color: var(--text-secondary);
  }
  .tweet-logo {
    color: var(--text-secondary);
  }
  .tweet-content {
    margin-top: 1rem;
  }
  .tweet-content a {
    color: var(--text-secondary);
  }
  .tweet-content .emoji {
    display: inline-block;
    height: 1.2em;
    width: 1.2em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }
  .tweet-media {
    margin-top: 1rem;
    border: 1px solid var(--border);
    border-radius: 1rem;
    overflow: hidden;
  }
  .tweet-summary-card-text {
    border-top: 1px solid var(--border);
    padding: 0.75rem;
    font-size: 0.95rem;
    color: var(--subtext-primary);
  }
  .tweet-summary-card-text span {
    font-size: 0.9rem;
  }
  .tweet-summary-card-text h2 {
    color: var(--text-primary);
  }
  .tweet-summary {
    display: flex;
  }
  .tweet-summary img {
    width: 130px;
    height: 130px;
  }
  .tweet-summary > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid var(--border);
    border-top: 0px !important;
  }

  .tweet-image {
    width: 100%;
  }
  .tweet-quoted .tweet {
    margin-top: 1rem;
    width: 100%;
  }`
  }

  return style + "</style>"
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
