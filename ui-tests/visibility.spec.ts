import { test, expect } from '@playwright/test';

test.describe('Visibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com');
    await page.locator('[href="/visibility"]').click();
    await expect(page.locator('h3:has-text("Visibility")')).toBeVisible();
    await page.locator('#hideButton').click(); // Trigger visibility changes
  });

  test('Removed button should not be in the DOM', async ({ page }) => {
    const removedButton = page.locator('#removedButton');
    await expect(removedButton).toHaveCount(0);
  });

  test('Zero width button should not be visible', async ({ page }) => {
    const zeroWidthButton = page.locator('#zeroWidthButton');
    await expect(zeroWidthButton).not.toBeVisible();
  });

  test('Overlapped button should not be interactable', async ({ page }) => {
    const overlappedButton = page.locator('#overlappedButton');
    const isVisible = await overlappedButton.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const topElement = document.elementFromPoint(centerX, centerY);
      return el.contains(topElement); // false = something is on top
    });
    expect(isVisible).toBe(false);
  });

  test('Opacity 0 button should be transparent', async ({ page }) => {
    const opacityZeroButton = page.locator('#transparentButton');
    const opacity = await opacityZeroButton.evaluate(el =>
      window.getComputedStyle(el).opacity
    );
    expect(opacity).toBe('0');
  });

  test('Visibility hidden button should not be visible', async ({ page }) => {
    const hiddenButton = page.locator('#invisibleButton');
    await expect(hiddenButton).not.toBeVisible();
  });

  test('Display none button should not be visible', async ({ page }) => {
    const displayNoneButton = page.locator('#notdisplayedButton');
    await expect(displayNoneButton).not.toBeVisible();
  });

  test('Offscreen button should be out of the viewport', async ({ page }) => {
    const offscreenButton = page.locator('#offscreenButton');
    const box = await offscreenButton.boundingBox();
    const viewport = await page.viewportSize();
    
    expect(box).not.toBeNull();
    const isInViewport =
      box!.x + box!.width > 0 &&
      box!.x < viewport!.width &&
      box!.y + box!.height > 0 &&
      box!.y < viewport!.height;

    expect(isInViewport).toBe(false);
  });
});