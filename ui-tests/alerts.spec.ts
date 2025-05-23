import { test, expect } from '@playwright/test';

test.describe('Alerts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com/alerts');
    });

    test('Handle Alert dialog', async ({ page }) => {
        await page.click('#alertButton');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/Today is a working day/);
            await dialog.accept();
        });
    });

    test('Handle Confirm dialog with acceptance', async ({ page }) => {
        // First dialog - confirmation
        await page.click('#confirmButton');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/Do you agree?/);
            await dialog.accept();
        });
        // Second dialog - result
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/Yes/);
            await dialog.accept();
        });  
    });

     test('Handle Confirm dialog with disagreement', async ({ page }) => {
        // First dialog - confirmation
        await page.click('#confirmButton');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/Do you agree?/);
            await dialog.dismiss();
        });
        // Second dialog - result
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/No/);
            await dialog.accept();
        });  
    });

    test('Handle Prompt dialog with default input', async ({ page }) => {
        await page.click('#promptButton');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/Enter your value:/);
            await dialog.accept('cats');
        });
        // Second dialog - result
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/User value: cats/);
            await dialog.accept();
        });  
    });

    test('Handle Prompt dialog with non-default input', async ({ page }) => {
        await page.click('#promptButton');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/Enter your value:/);
            await dialog.accept('dogs');
        });
        // Second dialog - result
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/User value: dogs/);
            await dialog.accept();
        });  
    });

    test('Handle Prompt dialog with dismissal', async ({ page }) => {
        await page.click('#promptButton');
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/Enter your value:/);
            await dialog.dismiss();
        });
        // Second dialog - result
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe(/User value: no answer/);
            await dialog.accept();
        });  
    });
});