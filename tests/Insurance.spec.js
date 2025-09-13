import { test, expect } from '@playwright/test';

test('Early Access Automation', async ({ page }) => {
    const mobile='9000000011';
    const username = 'rakesh';
    const dob='2000-12-12';
    const city='Bengaluru';
    const Email='rakesh0123@gmail.com';
    
    test.slow();
    await page.goto("https://www.nivabupa.com/health-insurance-plans/get-quote.html?cid=S_Gen_Intent_E_Online&utm_campaign=Google_Search_Generic_Intent_New&utm_adgroup=Medical_Insurance&utm_term=medical%20insurance%20india&utm_source=google&utm_medium=cpc&utm_campaign=Google_Search_Generic_Intent_New&utm_term=medical%20insurance%20india&utm_content=Medical_Insurance&ef_id=CjwKCAjwlOrFBhBaEiwAw4bYDZfREIhmRC5KlY9Jyyx863lQQoGx6gL_eQTynchN4RL0t7XSrcLJKBoClL4QAvD_BwE:G:s&s_kwcid=AL!7961!3!766975504298!b!!g!!medical%20insurance%20india&gad_source=1&gad_campaignid=16722486885&gbraid=0AAAAADs9tFjolZv1QexMgIl60PiA3dRF_&gclid=CjwKCAjwlOrFBhBaEiwAw4bYDZfREIhmRC5KlY9Jyyx863lQQoGx6gL_eQTynchN4RL0t7XSrcLJKBoClL4QAvD_BwE");
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
    await page.getByPlaceholder('Email ID').fill(Email);
    await page.waitForTimeout(2000);
    await page.locator("//button[@id='customer-details-submit-button']").click();
    await page.waitForTimeout(2000);
    await page.locator("//h3[@class='text-nivabupa-blue-ethinosPlanRecommendation font-semibold lg:text-4xl md:text-2xl text-4xl']").waitFor();
    const Premium = await page.locator("//h3[@class='text-nivabupa-blue-ethinosPlanRecommendation font-semibold lg:text-4xl md:text-2xl text-4xl']").textContent();
    console.log("Premium Amount is :" + Premium);
    await page.close();
});
