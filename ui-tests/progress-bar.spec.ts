import { test, expect } from '@playwright/test';

test.describe.configure({ retries: 2 });

test.describe('Progress Bar', () => {
  test('Clicking on start button and waiting for 75% progress before stopping', async ({ page }, testInfo) => {
        if (testInfo.retry) {
          console.log(`Retrying test, attempt #${testInfo.retry + 1}`);
        }

        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/progressbar"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Progress Bar")');
        const pageTitle = page.locator('h3:has-text("Progress Bar")');
        await expect(pageTitle).toBeVisible();
        
        // Start the progress
        await page.locator('#startButton').click();

        // Poll every 100ms until progress reaches >= 75
        let currentValue = 0;
        const timeout = 15000; // Max wait time
        const start = Date.now();

        while (Date.now() - start < timeout) {
          const valueStr = await page.locator('#progressBar').getAttribute('aria-valuenow');
          currentValue = parseInt(valueStr || '0');
          if (currentValue >= 75) break;
          await page.waitForTimeout(100); // wait a bit before checking again
        }

        // Stop the progress bar
        await page.locator('#stopButton').click();

        // Get final value after stopping
        const finalStr = await page.locator('#progressBar').getAttribute('aria-valuenow');
        const finalValue = parseInt(finalStr || '0');
        const diff = Math.abs(finalValue - 75);

        console.log(`Stopped at: ${finalValue}% (Difference: ${diff}%)`);
        expect(diff).toBeLessThanOrEqual(5); // Allow small margin
    });
});

