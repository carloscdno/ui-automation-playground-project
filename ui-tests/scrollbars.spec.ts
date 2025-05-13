import { test, expect } from '@playwright/test';
test.describe('Scrollbars', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/scrollbars"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Scrollbars")');
        const pageTitle = page.locator('h3:has-text("Scrollbars")');
        await expect(pageTitle).toBeVisible();
    });
    test('Scrollbars are visible on the page', async ({ page }) => {
        const button = page.locator('#hidingButton');
        // Ensure the button is present
        await button.waitFor();
        // Scroll into view if needed
        await button.scrollIntoViewIfNeeded();
        // Click the button
        await button.click();
    });

    test('Scrollbars are functional', async ({ page }) => {
        const scrollContainer = page.locator('div[style*="overflow-y: scroll"][style*="height:150px"]');
        // Get initial scroll position
        const initialPosition = await scrollContainer.evaluate((el) => el.scrollTop);
        // Scroll the container
        await scrollContainer.evaluate((el) => el.scrollTop += 100); // Scroll down by 100 pixels
        // Verify the new scroll position
        const newPosition = await scrollContainer.evaluate((el) => el.scrollTop);
        expect(newPosition).toBeGreaterThan(initialPosition);
    });
});