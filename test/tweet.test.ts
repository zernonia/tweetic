import { nextTick } from "vue"
import { flushPromises, mount } from "@vue/test-utils"
import Tweet from "../components/Tweet.vue"
import { mockGet } from "vi-fetch"

mockGet(
  "api/tweet?url=https://twitter.com/zernonia/status/1524620865987506176&layout=supabase&css=tailwind&showLink=true"
).willResolve({
  html: ' \n  <div class="w-[400px] p-8 text-black border border-gray-200 bg-white rounded-2xl" data-style="supabase">\n    <div class=" flex items-center justify-between">\n      <div class="relative flex items-center">\n        <svg class="bg-blue-400 text-white w-5 h-5 absolute -top-1 -left-2 rounded-full p-[0.2rem]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"></path></svg>\n        <img class="w-12 h-12 rounded-full" src="https://unavatar.io/twitter/@zernonia" >\n        <div class="ml-4">\n          <p class="font-medium"></p>\n          <a class="text-blue-400" target="_blank" href="https://twitter.com/zernonia">@zernonia</a>\n        </div>\n      </div>\n    </div>\n      \n    <div class="mt-4">\n      Oh yeah another free &amp; open source tools for everyone! 🎉😉<br><br>Inspired by those static tweets on <a href="https://twitter.com/supabase?ref_src=twsrc%5Etfw" target="_blank" class="text-blue-400">@supabase</a> landing page!!<br><br>Introducing <a href="https://t.co/LydLZZhCFR" target="_blank" class="text-blue-400">https://t.co/LydLZZhCFR</a>!!!!!\n    </div>\n  </div> \n  ',
  oembed: {
    url: "https://twitter.com/zernonia/status/1524620865987506176",
    author_name: "Zernonia",
    author_url: "https://twitter.com/zernonia",
    html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Oh yeah another free &amp; open source tools for everyone! 🎉😉<br><br>Inspired by those static tweets on <a href="https://twitter.com/supabase?ref_src=twsrc%5Etfw">@supabase</a> landing page!!<br><br>Introducing <a href="https://t.co/LydLZZhCFR">https://t.co/LydLZZhCFR</a>!!!!!</p>&mdash; Zernonia (@zernonia) <a href="https://twitter.com/zernonia/status/1524620865987506176?ref_src=twsrc%5Etfw">May 12, 2022</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
    width: 550,
    height: null,
    type: "rich",
    cache_age: "3153600000",
    provider_name: "Twitter",
    provider_url: "https://twitter.com",
    version: "1.0",
  },
})

test("component:Tweet.vue", async () => {
  expect(Tweet).toBeTruthy()

  const wrapper = mount(Tweet, {
    props: {
      url: "https://twitter.com/zernonia/status/1524620865987506176",
      layout: "supabase",
      css: "tailwind",
    },
  })

  await nextTick()
  await flushPromises()

  expect(wrapper.html()).toBe("")

  await wrapper.findAll(".tweet")

  await nextTick()
  await nextTick()

  const text = wrapper.html()
  expect(text).toContain("supabase")
})
