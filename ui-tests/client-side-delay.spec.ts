import { test, expect } from '@playwright/test';

test.describe.only('Client-side delay', () => {
  test('Clicking on the button and waiting for the loaded label', async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/clientdelay"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Client Side Delay")');
        const pageTitle = page.locator('h3:has-text("Client Side Delay")');
        await expect(pageTitle).toBeVisible();
        
        const loadDataButton = page.locator('#ajaxButton');
        await loadDataButton.click();
        
        // Wait for the element with class 'bg-success' to appear
        await page.waitForSelector('.bg-success', { state: 'visible', timeout: 25000 });
        
        // Verify the text and click
        const content = page.locator('.bg-success');
        await expect(content).toHaveText(/Data calculated on the client side/);
        await content.click();
    });
});