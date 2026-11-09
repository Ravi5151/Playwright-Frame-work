const { test, expect, browser } = require("@playwright/test");

test("Child window handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const [childPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator(".blinkingText").nth(0).click(),
  ]);
  const text = await childPage.locator(".red").textContent();
  console.log(text);
  const array = text.split("@");
  const domain = array[1].split(" ")[0];
  await page.locator("#username").fill(domain);
  expect(await page.locator("#username").inputValue()).toBe(domain);
});
