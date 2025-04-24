import { test, expect } from '@playwright/test';

test.describe('Dynamic ID Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com/dynamicid'); 
    });

    test('Clicking on button without using its ID', async ({ page }) => {
        // Example of using a dynamic ID in a selector
        // This one should pass because the ID is dynamic and we are not using it directly
       await page.click('.btn.btn-primary'); 
    });

    test('Clicking on button using its ID', async ({ page }) => {
        // Example of using a static ID in a selector
        // This one should fail because the ID will change every time the page is loaded
        await page.click('#3f1b79e2-26e0-660c-757f-61adca5892fd');
    });
});

