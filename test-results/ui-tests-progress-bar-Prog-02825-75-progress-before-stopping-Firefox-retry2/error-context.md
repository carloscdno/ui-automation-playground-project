# Test info

- Name: Progress Bar >> Clicking on start button and waiting for 75% progress before stopping
- Location: D:\QA Engineering\Automation Stuff\Projects\automation-playground\ui-automation-playground-project\ui-tests\progress-bar.spec.ts:6:7

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 5
Received:    15
    at D:\QA Engineering\Automation Stuff\Projects\automation-playground\ui-automation-playground-project\ui-tests\progress-bar.spec.ts:42:22
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
- heading "Progress Bar" [level=3]
- paragraph: A web application may use a progress bar to reflect state of some lengthy process. Thus a test may need to read the value of a progress bar to determine if it is time to proceed or not.
- heading "Scenario" [level=4]
- list:
  - listitem: Create a test that clicks Start button and then waits for the progress bar to reach 75%. Then the test should click Stop. The less the differnce between value of the stopped progress bar and 75% the better your result.
- heading "Playground" [level=4]
- button "Start"
- button "Stop"
- progressbar: 60%
- paragraph: "Result: -15, duration: 14993"
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
   3 | test.describe.configure({ retries: 2 });
   4 |
   5 | test.describe.only('Progress Bar', () => {
   6 |   test('Clicking on start button and waiting for 75% progress before stopping', async ({ page }, testInfo) => {
   7 |         if (testInfo.retry) {
   8 |           console.log(`Retrying test, attempt #${testInfo.retry + 1}`);
   9 |         }
  10 |
  11 |         await page.goto('http://uitestingplayground.com');
  12 |         const urlLink = page.locator('[href="/progressbar"]');
  13 |         await urlLink.click();
  14 |         await page.waitForSelector('h3:has-text("Progress Bar")');
  15 |         const pageTitle = page.locator('h3:has-text("Progress Bar")');
  16 |         await expect(pageTitle).toBeVisible();
  17 |         
  18 |         // Start the progress
  19 |         await page.locator('#startButton').click();
  20 |
  21 |         // Poll every 100ms until progress reaches >= 75
  22 |         let currentValue = 0;
  23 |         const timeout = 15000; // Max wait time
  24 |         const start = Date.now();
  25 |
  26 |         while (Date.now() - start < timeout) {
  27 |           const valueStr = await page.locator('#progressBar').getAttribute('aria-valuenow');
  28 |           currentValue = parseInt(valueStr || '0');
  29 |           if (currentValue >= 75) break;
  30 |           await page.waitForTimeout(100); // wait a bit before checking again
  31 |         }
  32 |
  33 |         // Stop the progress bar
  34 |         await page.locator('#stopButton').click();
  35 |
  36 |         // Get final value after stopping
  37 |         const finalStr = await page.locator('#progressBar').getAttribute('aria-valuenow');
  38 |         const finalValue = parseInt(finalStr || '0');
  39 |         const diff = Math.abs(finalValue - 75);
  40 |
  41 |         console.log(`Stopped at: ${finalValue}% (Difference: ${diff}%)`);
> 42 |         expect(diff).toBeLessThanOrEqual(5); // Allow small margin
     |                      ^ Error: expect(received).toBeLessThanOrEqual(expected)
  43 |     });
  44 | });
  45 |
  46 |
```