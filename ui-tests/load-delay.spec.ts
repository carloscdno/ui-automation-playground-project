import { test, expect } from '@playwright/test';

test.describe.only('Load Delay Test', () => {
    test('Clicking the button after a delay', async ({ page }) => {
        // Go to home page
        await page.goto('http://uitestingplayground.com');
        // Click on the link to load delay page
        const urlLink = page.locator('[href="/loaddelay"]');
        await urlLink.click();
        // Wait for the button to be visible
        await page.waitForSelector('.btn.btn-primary');
        // Check if the button is visible
        const testButton = page.locator('.btn.btn-primary');
        await expect(testButton).toBeVisible();
    });
});