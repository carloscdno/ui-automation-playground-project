import {test, expect} from '@playwright/test';

test.describe('Verify Text', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/verifytext"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Verify Text")');
        const pageTitle = page.locator('h3:has-text("Verify Text")');
        await expect(pageTitle).toBeVisible();
    });

    test('Find normalized welcome text', async ({page}) => {
        const welcomeMessage = page.locator('span', { hasText: 'Welcome UserName!' });
        // Assertion
        await expect(welcomeMessage).toBeVisible();
    });
});