import { test, expect } from '@playwright/test';

test.describe('Ajax data test', () => {
    test('Clicking on the text of the loaded label', async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/ajax"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("AJAX Data")');
        const pageTitle = page.locator('h3:has-text("AJAX Data")');
        await expect(pageTitle).toBeVisible();
        
        const loadDataButton = page.locator('#ajaxButton');
        await loadDataButton.click();
        
        // Wait for the element with class 'bg-success' to appear
        await page.waitForSelector('.bg-success', { state: 'visible', timeout: 25000 });
        
        // Verify the text and click
        const content = page.locator('.bg-success');
        await expect(content).toHaveText(/Data loaded with AJAX/);
        await content.click();
    });
});