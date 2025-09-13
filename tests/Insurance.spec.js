import { test, expect } from '@playwright/test';

test('Early Access Automation', async ({ page }) => {
  const mobile = process.env.MOBILE || '9000000011';
  const username = process.env.USERNAME || 'rakesh';
  const dob = process.env.DOB || '2000-12-12';
  const city = process.env.CITY || 'Bengaluru';
  const email = process.env.EMAIL || 'rakesh0123@gmail.com';

  test.slow();
  await page.goto("https://www.nivabupa.com/health-insurance-plans/get-quote.html?...");

  await page.locator("//input[@id='mobile-number']").fill(mobile);
  await page.locator("//button[@id='phonenumber-next']").click();
  await page.locator("//input[@id='name']").fill(username);
  await page.waitForTimeout(2000);
  await page.locator("//button[@id='name-next']").click();
  await page.waitForTimeout(2000);
  await page.locator("//input[@id='dob']").fill(dob);
  await page.waitForTimeout(2000);
  await page.getByPlaceholder('Enter City').fill(city);
  await page.waitForTimeout(2000);
  await page.getByPlaceholder('Email ID').fill(email);
  await page.waitForTimeout(2000);
  await page.locator("//button[@id='customer-details-submit-button']").click();
  await page.waitForTimeout(2000);

  const premiumLocator = page.locator("//h3[@class='text-nivabupa-blue-ethinosPlanRecommendation font-semibold lg:text-4xl md:text-2xl text-4xl']");
  await premiumLocator.waitFor();
  const Premium = await premiumLocator.textContent();
  console.log("Premium Amount is :" + Premium);

  await page.close();
});
