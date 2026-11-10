const { test, expect } = require("@playwright/test");

test("End to End Automation of a page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const productName = "ZARA COAT 3";
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");
  await page.locator('[id = "userEmail"]').fill("testaccont@gmail.com"); //CSS locator based on any attribute
  await page.locator("input#userPassword").fill("Jyotsna9924#"); //CSS locator with id
  await page.locator(".login-btn").click(); //CSS locator with class attribut
  //await page
  //  .locator(".card")
  //  .filter({ hasText: "ADIDAS ORIGINAL" })
  //  .getByRole("button", { name: "Add To Cart" })
  //  .click();
  //await page.pause();
  await page.locator(".card-body").first().waitFor();
  const product = await page.locator(".card-body");
  const count = await product.count();
  await console.log(count);
  for (let i = 0; i < count; ++i) {
    const title = await product.nth(i).locator("b").textContent();
    await console.log(title);
    if (title === productName) {
      await product.nth(i).locator("text = Add To Cart").click();
      console.log("button clicked");
      break;
    }
  }
  //await page.pause();
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
  console.log(bool);
  await expect(bool).toBeTruthy();
});
