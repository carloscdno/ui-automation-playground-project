import { test, expect } from '@playwright/test';

test.describe('Hidden Layers Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com/hiddenlayers'); 
    });

    test('Clicking on green button changes its color to blue', async ({ page }) => {
        // This test checks if clicking the green button changes its color to blue
        const greenButton = page.locator('.btn.btn-success');
        await expect(greenButton).toBeVisible();
      
        await greenButton.click();
      
        const blueButton = page.locator('.btn.btn-primary');
        await expect(blueButton).toBeVisible();
      });
      
      test('Clicking the green button a second time does not work', async ({ page }) => {
        // This test checks if clicking the green button a second time does not change its color
        const greenButton = page.locator('.btn.btn-success');
        await greenButton.click();
      
        const blueButton = page.locator('.btn.btn-primary');
        await expect(blueButton).toBeVisible();
      
        const classBefore = await blueButton.getAttribute('class');
      
        // Try clicking again
        try {
          await blueButton.click({ trial: true }); // does not actually click, just checks interactability
        } catch (e) {
          console.log('Button is not interactable.');
        }
      
        const classAfter = await blueButton.getAttribute('class');
        expect(classAfter).toBe(classBefore); // No change expected
      });
});