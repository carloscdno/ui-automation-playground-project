import { test, expect } from '@playwright/test';
test.describe.only('Text Input', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/textinput"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Text Input")');
        const pageTitle = page.locator('h3:has-text("Text Input")');
        await expect(pageTitle).toBeVisible();
    });

    test('Input field is empty by default', async ({ page }) => {
        const inputField = page.locator('#newButtonName');
        const inputValue = await inputField.inputValue();
        expect(inputValue).toBe('');
    });

    test('Button text matches input text', async ({ page }) => {
        const inputField = page.locator('#newButtonName');
        await inputField.fill('Test');
        const buttonText = page.locator('#updatingButton');
        await buttonText.click();
        expect(buttonText).toHaveText('Test');
    });
});