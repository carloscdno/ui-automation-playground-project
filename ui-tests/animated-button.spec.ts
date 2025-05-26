import { test, expect } from '@playwright/test';    

test.describe('Animated Button', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/animation"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Animated Button")');
        const pageTitle = page.locator('h3:has-text("Animated Button")');
        await expect(pageTitle).toBeVisible();
    });

    test('Start animation and wait for Moving Target to stop spinning', async ({ page }) => {
        const startButton = page.getByRole('button', { name: 'Start Animation' });
        const movingTarget = page.getByRole('button', { name: 'Moving Target' });
        
        // Start animation
        await startButton.click();

        // Wait until the 'spin' class is removed 
        await expect(movingTarget).not.toHaveClass(/spin/, {timeout: 7000});

        // Confirm final class for debugging
        const finalClass = await movingTarget.getAttribute('class');
        console.log('Final class:', finalClass);
    });

    test('Verify Moving Target has "spin" class while animation is active', async ({ page }) => {
        const startButton = page.getByRole('button', { name: 'Start Animation' });
        const movingTarget = page.getByRole('button', { name: 'Moving Target' });
        
        // Start animation
        await startButton.click();

        // Wait briefly to allow animation to begin
        await page.waitForTimeout(2000); 

        // Assert that the class list includes 'spin'
        const classValue = await movingTarget.getAttribute('class');
        console.log('Class while spinning:', classValue);
        expect(classValue).toContain('spin');
    });
});