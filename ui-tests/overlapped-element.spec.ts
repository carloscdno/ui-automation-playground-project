import { test, expect } from '@playwright/test';

test.describe('Overlapped Element', () => {
    test('Entering text into overlapped input after scrolling it into view', async ({ page }) => {
        await page.goto('http://uitestingplayground.com/overlapped');

        const nameInput = page.locator('#name');
        // Scroll with pixel precision
        await nameInput.evaluate(el => el.scrollIntoView({ block: 'center' }));
  
        // Wait for input to be interactable
        await nameInput.waitFor({ state: 'visible', timeout: 10000 });
  
        // Clear existing value and type with forced click
        await nameInput.click({ force: true, position: { x: 10, y: 10 } });
        await nameInput.fill('Carlos QA');

        // Verify input using JavaScript property
        const value = await nameInput.evaluate(el => (el as HTMLInputElement).value);
        expect(value).toBe('Carlos QA');
    });
}); 