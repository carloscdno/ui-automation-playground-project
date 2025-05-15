import { test, expect } from '@playwright/test';

test.describe('Dynamic Table', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/dynamictable"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Dynamic Table")');
        const pageTitle = page.locator('h3:has-text("Dynamic Table")');
        await expect(pageTitle).toBeVisible();
    });
    test('Verify Chrome CPU matches yellow label', async ({ page }) => {
        // Wait for rows to appear
         await page.locator('div[role="row"]').nth(1).waitFor();

        // Get index of "CPU" column
        const headers = await page.locator('div[role="row"]').first().locator('span[role="columnheader"]').allTextContents();
        const cpuIndex = headers.findIndex(h => h.trim().toLowerCase() === 'cpu');

        if (cpuIndex === -1) {
          throw new Error('CPU column not found');
        }

        // Locate Chrome row
        const chromeRow = page.locator('div[role="row"]', { hasText: 'Chrome' }).first();
        const chromeCells = chromeRow.locator('span[role="cell"]');
        const chromeCpuValue = (await chromeCells.nth(cpuIndex).innerText()).trim();

        // Get value from yellow box
        const labelText = await page.locator('.bg-warning').innerText();
        const chromeCpuFromLabel = labelText.split(': ')[1].trim();

        // Compare
        expect(chromeCpuValue).toBe(chromeCpuFromLabel);
    });
});