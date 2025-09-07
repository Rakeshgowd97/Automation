import { test, expect } from '@playwright/test';

test('Early Access Automation', async ({ page }) => {
    test.slow();
    await page.goto('https://www.naukri.com/');
    await page.locator('//a[text()="Login"]').click();

    await page.getByPlaceholder('Enter your active Email ID / Username').fill('\');
    await page.getByPlaceholder('Enter your password').fill('Ra2');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.waitForTimeout(3000); // Wait for login to complete
    await page.getByRole('button', { name: 'Share interest' }).first().click();
    await page.waitForTimeout(2000);
    const totalRoles = await page.getByText('Share Interest').count();
    console.log(`Total roles available: ${totalRoles}`);
    for (let i = 0; i < totalRoles; i++) {
        await page.getByText('Share Interest').first().click();
        await page.waitForTimeout(1000);
    }
});
