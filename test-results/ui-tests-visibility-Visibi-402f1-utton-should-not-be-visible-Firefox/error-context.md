# Test info

- Name: Visibility >> Zero width button should not be visible
- Location: D:\QA Engineering\Automation Stuff\Projects\automation-playground\ui-automation-playground-project\ui-tests\visibility.spec.ts:16:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).not.toBeVisible()

Locator: locator('#zeroWidthButton')
Expected: not visible
Received: visible
Call log:
  - expect.not.toBeVisible with timeout 5000ms
  - waiting for locator('#zeroWidthButton')
    9 × locator resolved to <button type="button" id="zeroWidthButton" class="btn btn-warning">Zero Width</button>
      - unexpected value "visible"

    at D:\QA Engineering\Automation Stuff\Projects\automation-playground\ui-automation-playground-project\ui-tests\visibility.spec.ts:18:39
```

# Page snapshot

```yaml
- navigation:
  - link "UITAP":
    - /url: /
  - list:
    - listitem:
      - link "Home":
        - /url: /home
    - listitem:
      - link "Resources":
        - /url: /resources
- heading "Visibility" [level=3]
- paragraph: Checking if element is visible on screen may be a non trivial task.
- list:
  - listitem: An element may be removed (simplest case),
  - listitem: it may have zero height or width,
  - listitem: it may be covered by another element,
  - listitem: "it may be hidden using styles: opacity: 0, visibility: hidden, display: none,"
  - listitem: or moved offscreen.
- heading "Scenario" [level=4]
- list:
  - listitem: Learn locators of all buttons.
  - listitem: In your testing scenario press Hide button.
  - listitem: Determine if other buttons visible or not.
- heading "Playground" [level=4]
- table:
  - rowgroup:
    - row "Hide Removed Zero Width Overlapped":
      - cell "Hide":
        - button "Hide"
      - cell "Removed":
        - button "Removed"
      - cell "Zero Width":
        - button "Zero Width"
      - cell "Overlapped":
        - button "Overlapped"
    - row "Opacity 0 Visibility Hidden Display None Offscreen":
      - cell "Opacity 0":
        - button "Opacity 0"
      - cell "Visibility Hidden":
        - button "Visibility Hidden"
      - cell "Display None":
        - button "Display None"
      - cell "Offscreen":
        - button "Offscreen"
- contentinfo:
  - link "Fork the website on GitHub":
    - /url: https://github.com/inflectra/ui-test-automation-playground
  - text: . Supported by
  - link "Rapise":
    - /url: https://www.inflectra.com/Rapise/
  - text: test automation team. Copyright © 2020
  - link "Inflectra Corporation":
    - /url: https://www.inflectra.com/
  - text: . This work is licensed under the
  - link "Apache License 2.0":
    - /url: https://www.apache.org/licenses/LICENSE-2.0
  - text: .
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Visibility', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('http://uitestingplayground.com');
   6 |     await page.locator('[href="/visibility"]').click();
   7 |     await expect(page.locator('h3:has-text("Visibility")')).toBeVisible();
   8 |     await page.locator('#hideButton').click(); // Trigger visibility changes
   9 |   });
  10 |
  11 |   test('Removed button should not be in the DOM', async ({ page }) => {
  12 |     const removedButton = page.locator('#removedButton');
  13 |     await expect(removedButton).toHaveCount(0);
  14 |   });
  15 |
  16 |   test('Zero width button should not be visible', async ({ page }) => {
  17 |     const zeroWidthButton = page.locator('#zeroWidthButton');
> 18 |     await expect(zeroWidthButton).not.toBeVisible();
     |                                       ^ Error: Timed out 5000ms waiting for expect(locator).not.toBeVisible()
  19 |   });
  20 |
  21 |   test('Overlapped button should not be interactable', async ({ page }) => {
  22 |     const overlappedButton = page.locator('#overlappedButton');
  23 |     const isVisible = await overlappedButton.evaluate(el => {
  24 |       const rect = el.getBoundingClientRect();
  25 |       const centerX = rect.left + rect.width / 2;
  26 |       const centerY = rect.top + rect.height / 2;
  27 |       const topElement = document.elementFromPoint(centerX, centerY);
  28 |       return el.contains(topElement); // false = something is on top
  29 |     });
  30 |     expect(isVisible).toBe(false);
  31 |   });
  32 |
  33 |   test('Opacity 0 button should be transparent', async ({ page }) => {
  34 |     const opacityZeroButton = page.locator('#transparentButton');
  35 |     const opacity = await opacityZeroButton.evaluate(el =>
  36 |       window.getComputedStyle(el).opacity
  37 |     );
  38 |     expect(opacity).toBe('0');
  39 |   });
  40 |
  41 |   test('Visibility hidden button should not be visible', async ({ page }) => {
  42 |     const hiddenButton = page.locator('#invisibleButton');
  43 |     await expect(hiddenButton).not.toBeVisible();
  44 |   });
  45 |
  46 |   test('Display none button should not be visible', async ({ page }) => {
  47 |     const displayNoneButton = page.locator('#notdisplayedButton');
  48 |     await expect(displayNoneButton).not.toBeVisible();
  49 |   });
  50 |
  51 |   test('Offscreen button should be out of the viewport', async ({ page }) => {
  52 |     const offscreenButton = page.locator('#offscreenButton');
  53 |     const box = await offscreenButton.boundingBox();
  54 |     const viewport = await page.viewportSize();
  55 |     
  56 |     expect(box).not.toBeNull();
  57 |     const isInViewport =
  58 |       box!.x + box!.width > 0 &&
  59 |       box!.x < viewport!.width &&
  60 |       box!.y + box!.height > 0 &&
  61 |       box!.y < viewport!.height;
  62 |
  63 |     expect(isInViewport).toBe(false);
  64 |   });
  65 | });
```