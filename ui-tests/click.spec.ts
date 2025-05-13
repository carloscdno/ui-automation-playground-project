import { test, expect } from '@playwright/test';

test.describe('Click', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/click"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Click")');
        const pageTitle = page.locator('h3:has-text("Click")');
        await expect(pageTitle).toBeVisible();
    });
    test('Nothing happens when clicking on the button with event-based click (manual dispatch)', async ({ page }) => {
        const loadDataButton = page.locator('#badButton');

        // Dispatch a click event directly (DOM-based)
        await loadDataButton.evaluate(button => (button as HTMLElement).click());

        // Get the class after the DOM-only click
        const buttonClass = await loadDataButton.getAttribute('class');

        // Assert that class did not change to success
        expect(buttonClass).not.toContain('btn-success');
    });

    test('Clicking on the button by emulating physical mouse click', async ({ page }) => {
        // This test checks if clicking the button by emulating a physical mouse click changes its color
        const button = page.locator('#badButton');
        const box = await button.boundingBox();

        if (box) {
          const x = box.x + box.width / 2;
          const y = box.y + box.height / 2;
        
         // Perform mouse click at the center of the button
          await page.mouse.click(x, y);
        } else {
           throw new Error('Button not found or not visible');
        }

        // Wait for the button to change color
        await page.waitForSelector('#badButton', { state: 'visible', timeout: 5000 });
        // Verify the button's class has changed
        const buttonClass = await button.getAttribute('class');
        expect(buttonClass).toContain('btn-success');
    });
});