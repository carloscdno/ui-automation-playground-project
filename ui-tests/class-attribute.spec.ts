import { test, expect } from '@playwright/test';

test.describe('Class Attribute Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com/classattr'); 
    });

    test('Clicking on green button', async ({ page }) => {
        // No action gets triggered when clicking on the green button
       await page.click('.btn.btn-success'); 
    });

    test('Clicking on yellow button', async ({ page }) => {
        // No action gets triggered when clicking on the yellow button
       await page.click('.btn.btn-warning'); 
    });

    test('Clicking on blue button and handling pop-up alert', async ({ page }) => {
        // This one should trigger a pop-up alert
        // and we will handle it using the page.on('dialog') event
        await page.click('.btn.btn-primary');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Primary button pressed');
            await dialog.accept();
        });
    });
});
