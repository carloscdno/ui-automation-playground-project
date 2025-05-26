import { test, expect } from '@playwright/test';

test.describe('Disabled Input', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/disabledinput"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Disabled Input")');
        const pageTitle = page.locator('h3:has-text("Disabled Input")');
        await expect(pageTitle).toBeVisible();
    });

    test('Wait for input to be enabled and type text', async ({ page }) => {
        const inputField = page.locator('#inputField');
        const enableButton = page.locator('#enableButton');
        const inputStatus = page.locator('#opstatus');

        // Disable the input field
        await enableButton.click();

        // Assert the input is disabled initially
        await expect(inputField).toBeDisabled();
        
        // Wait until the input becomes enabled
        await expect(inputField).toBeEnabled({ timeout: 6000 });

        // Type text after it becomes enabled
         await inputField.fill('Hello QA enthusiasts!');
         // Press enter to submit the input
         await inputField.press('Enter');

        // Assert the input has the correct value
         await expect(inputStatus).toHaveText(/Hello QA enthusiasts!/);
    });

    test('Input is initially disabled and typing is not allowed', async ({ page }) => {
        const inputField = page.locator('#inputField');
        const enableButton = page.locator('#enableButton');
        const inputStatus = page.locator('#opstatus');

        // Disable the input field
        await enableButton.click();

        // Assert the input is disabled initially
        await expect(inputStatus).toHaveText(/Disabled/);
        
        // Simulate a user trying to type while the input is focused even though it's disabled
        await inputField.focus();
        await page.keyboard.type('Should not work');

        // Input should still be empty
        await expect(inputField).toHaveValue('');
    });
});