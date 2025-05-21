import { test, expect } from '@playwright/test';

test.describe('Non-Breaking Space', () => {
    test('Clicking on the button with non-breaking space', async ({ page }) => {
        await page.goto('http://uitestingplayground.com/nbsp');

        // Since the button has a non-breaking space, and there's an example text with a non-breaking space,
        // we need to use the correct selector to find the button.
        const button = page.getByRole('button', { name: 'My\u00A0Button' });
        await expect(button).toBeVisible();
        await button.click();
  
    });
});