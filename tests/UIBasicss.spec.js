const { test, expect } = require("@playwright/test");

test("Browser contxt example", async ({ browser }) => {
  //Chrome --Plugins/cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
});

test("Page context example", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");
  //await page.locator('[id = "userEmail"]').fill("ravi@gmail.com"); //CSS locator based on any attribute
  //await page.locator("input#userPassword").fill("jyotsna9924#"); //CSS locator with id
  await page.locator(".login-btn").click(); //CSS locator with class attribute
  await expect(
    page.locator(".invalid-feedback").filter({ hasText: "Email is required" }),
  ).toBeVisible();
  await expect(
    page
      .locator(".invalid-feedback")
      .filter({ hasText: "Password is required" }),
  ).toBeVisible();
  await expect(page.locator('[class="blink_me"]')).toContainText(
    "Register to sign in",
  );
});

test("Log in to Websiet and getting Product title", async ({ page }) => {
  const userName = page.locator("[id = 'userEmail']");
  const password = page.locator("[id = 'userPassword']");
  const signInButton = page.locator("[id = 'login']");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await userName.fill("ravi8734@gmail.com");
  await password.fill("Jyotsna9924#");
  await expect(page.locator("label.blink_me")).toHaveAttribute(
    "class",
    "blink_me",
  );
  await signInButton.click();
  //  console.log(await page.locator(".card-body b").nth(0).textContent());
  //  console.log(await page.locator(".card-body b").last().textContent());
  await page.waitForLoadState("networkidle");
  //await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  expect(dropdown).toHaveValue("consult");
  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();
  await page.locator("#terms").check();
  expect(page.locator("#terms").isChecked()).toBeTruthy();
  expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(page.locator("#terms")).not.toBeChecked();
  const documentLink = page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});
