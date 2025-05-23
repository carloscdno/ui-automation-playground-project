import { test, expect } from '@playwright/test';

test.describe('Shadow DOM', () => {
    test('Generate and copy GUID from Shadow DOM', async ({ page, context, browserName }) => {
      test.skip(browserName !== 'chromium', 'Clipboard permissions only supported in Chromium');
      // Allow clipboard access
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.goto('https://uitestingplayground.com/shadowdom');

      const shadowHost = page.locator('guid-generator');

      const input = shadowHost.locator('input#editField');
      const generateButton = shadowHost.locator('button#buttonGenerate');
      const copyButton = shadowHost.locator('button#buttonCopy');

      await generateButton.click();
      await copyButton.click();

      const generated = await input.inputValue();
      const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

      expect(clipboardText).toBe(generated);
             
    });
});