import { test, expect } from '@playwright/test';

test.describe('Mouse Over', () => {
  test('Clicking both links twice after hover-triggered replacement', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/mouseover');

    // ---------- First link: "Click me" ----------
    // Hover to trigger replacement
    await page.hover('text=Click me');

    // Re-select the new element and click
    const clickMeLink1 = page.locator('text=Click me');
    await expect(clickMeLink1).toBeVisible();
    await clickMeLink1.click();

    // Hover again to trigger another replacement
    await page.hover('text=Click me');

    const clickMeLink2 = page.locator('text=Click me');
    await expect(clickMeLink2).toBeVisible();
    await clickMeLink2.click();

    // Verify count is 2
    const clickMeCount = page.locator('text=The link above clicked').first();
    await expect(clickMeCount).toContainText('2');

    // ---------- Second link: "Link Button" ----------
    await page.hover('text=Link Button');

    const linkButton1 = page.locator('text=Link Button');
    await expect(linkButton1).toBeVisible();
    await linkButton1.click();

    await page.hover('text=Link Button');

    const linkButton2 = page.locator('text=Link Button');
    await expect(linkButton2).toBeVisible();
    await linkButton2.click();

    const linkButtonCount = page.locator('text=The link above clicked').nth(1);
    await expect(linkButtonCount).toContainText('2');
  });
});