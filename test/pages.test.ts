/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from "vitest"
import { setup, fetch, $fetch, startServer } from "@nuxt/test-utils-edge"
import { expectNoClientErrors } from "./utils"
import { JSDOM } from "jsdom"

await setup({
  server: true,
  browser: true,
})

describe("pages", () => {
  it("render index", async () => {
    const html = await $fetch("/")

    // should render text
    expect(html).toContain("Convert Tweets to Static HTML")
    expect(html).toContain("Create your testimonial wall statically and style it however you want!")

    expect(html).toContain("tweet")
    expect(html).toContain("tweet-content")

    await expectNoClientErrors("/")
  })

  it("render create", async () => {
    const html = await $fetch("/create")
    expect(html).toContain("Create static tweets")

    const dom = new JSDOM(html)
    const h2 = dom.window.document.querySelector("h2")

    console.log({ h2: h2.innerHTML })

    const input = dom.window.document.querySelector("input")
    input.value = "https://twitter.com/zernonia/status/1512621505527484419"
    console.log({ value: input.value })

    await expectNoClientErrors("/")
  })

  // it("render 404", async () => {
  //   const html = await $fetch("/not-found")

  //   // Snapshot
  //   // expect(html).toMatchInlineSnapshot()

  //   expect(html).toContain("[...slug].vue")
  //   expect(html).toContain("404 at not-found")

  //   await expectNoClientErrors("/not-found")
  // })

  // it("preserves query", async () => {
  //   const html = await $fetch("/?test=true")

  //   // Snapshot
  //   // expect(html).toMatchInlineSnapshot()

  //   // should render text
  //   expect(html).toContain("Path: /?test=true")

  //   await expectNoClientErrors("/?test=true")
  // })

  // it("/nested/[foo]/[bar].vue", async () => {
  //   const html = await $fetch("/nested/one/two")

  //   // Snapshot
  //   // expect(html).toMatchInlineSnapshot()

  //   expect(html).toContain("nested/[foo]/[bar].vue")
  //   expect(html).toContain("foo: one")
  //   expect(html).toContain("bar: two")
  // })

  // it("/nested/[foo]/index.vue", async () => {
  //   const html = await $fetch("/nested/foobar")

  //   // TODO: should resolved to same entry
  //   // const html2 = await $fetch('/nested/foobar/index')
  //   // expect(html).toEqual(html2)

  //   // Snapshot
  //   // expect(html).toMatchInlineSnapshot()

  //   expect(html).toContain("nested/[foo]/index.vue")
  //   expect(html).toContain("foo: foobar")

  //   await expectNoClientErrors("/nested/foobar")
  // })

  // it("/nested/[foo]/user-[group].vue", async () => {
  //   const html = await $fetch("/nested/foobar/user-admin")

  //   // Snapshot
  //   // expect(html).toMatchInlineSnapshot()

  //   expect(html).toContain("nested/[foo]/user-[group].vue")
  //   expect(html).toContain("foo: foobar")
  //   expect(html).toContain("group: admin")

  //   await expectNoClientErrors("/nested/foobar/user-admin")
  // })

  // it("/parent", async () => {
  //   const html = await $fetch("/parent")
  //   expect(html).toContain("parent/index")

  //   await expectNoClientErrors("/parent")
  // })

  // it("/another-parent", async () => {
  //   const html = await $fetch("/another-parent")
  //   expect(html).toContain("another-parent/index")

  //   await expectNoClientErrors("/another-parent")
  // })
})
