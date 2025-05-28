import { test, expect } from '@playwright/test';
test.describe.only('Auto Wait for UI elements', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/autowait"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Auto Wait")');
        const pageTitle = page.locator('h3:has-text("Auto Wait")');
        await expect(pageTitle).toBeVisible();
    });

    //  Button - Visible and Enabled
    test('Button becomes visible and enabled after 3s delay', async ({ page }) => {
        await page.selectOption('select', 'Button');
        await page.getByLabel('Visible').uncheck();
        await page.getByLabel('Enabled').uncheck();
        await page.getByRole('button', { name: 'Apply 3s' }).click();

        // Wait for the button to become visible and enabled
        await page.waitForTimeout(3000); // Wait for 3 seconds
        const button = page.getByRole('button', { name: 'Button' });
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();

        await button.click();
        const target = page.locator('#opstatus');
        await expect(target).toHaveText(/clicked/);
    });

   // Input Field - Editable
    test('Input is only editable after 5s', async ({ page }) => {
        await page.selectOption('select', 'Input');
        await page.getByLabel('Editable').uncheck();
        await page.getByRole('button', { name: 'Apply 5s' }).click();

        // Wait for the input to become editable
        await page.waitForTimeout(5000); // Wait for 5 seconds

        const input = page.locator('input[type="text"]');
        await expect(input).toBeVisible();
        await expect(input).toBeEditable();

        await input.fill('Test input after delay');
        await expect(input).toHaveValue('Test input after delay');
  });

    // Textarea Test - not editable
    test('Textarea is visible and enabled but not editable (fail on fill)', async ({ page }) => {
        await page.selectOption('select', 'Textarea');
        await page.getByLabel('Visible').check();
        await page.getByLabel('Enabled').check();
        await page.getByLabel('Editable').uncheck();
        await page.getByRole('button', { name: 'Apply 3s' }).click();

        // Wait less than 3 seconds for the textarea to not be editable
        await page.waitForTimeout(1000); // Wait for 1 second

        const textarea = page.locator('textarea[id="target"]');
        await expect(textarea).toBeVisible();
        await expect(textarea).toBeEnabled();

        const isEditable = await textarea.isEditable();
        expect(isEditable).toBeFalsy(); // Confirm that it’s NOT editable
  });

    // Select Dropdown - Overlayed for 10s
    test('Dropdown is overlayed for 10s, and then we can select an option', async ({ page }) => {
        await page.selectOption('select', 'Select');
        await page.getByLabel('Visible').check();
        await page.getByLabel('Enabled').check();
        await page.getByLabel('On Top').uncheck();
        await page.getByRole('button', { name: 'Apply 10s' }).click();

        // Verify that the dropdown is not clickable before the delay
        const dropdown = page.locator('select[id="target"]');
        const overlay = page.locator('#overlay'); 

        // Immediate checks
        await expect(dropdown).toBeVisible(); // Dropdown exists but is covered
        await expect(overlay).toBeVisible(); 

        // Attempt interaction (should fail)
        await expect(async () => {
        try {
            await dropdown.click({ timeout: 3000 });
        } catch (error) {
            console.log('Verification: Dropdown was unclickable due to overlay');
            console.log('Error Details:', error.message);
            throw error; // Re-throw for the expect() to catch
        }
    }).rejects.toThrow(/Timeout.*3000ms/);

        // Wait for overlay removal (10s delay + buffer)
        await overlay.waitFor({ state: 'hidden', timeout: 11000 });

        
        // Verify final state
        await expect(dropdown).toBeVisible();
        await dropdown.selectOption({ label: 'Item 3' });
        await expect(dropdown).toHaveValue(/3/);
  });

    // Label - Visible after 3s delay
    test('Label becomes visible after 3s delay', async ({ page }) => {
        await page.selectOption('select', 'Label');
        await page.getByLabel('Visible').uncheck();
        await page.getByRole('button', { name: 'Apply 3s' }).click();

        // Verify label is not visible initially
        const label = page.locator('label[id="target"]');
        await expect(label).not.toBeVisible();
        
        // Wait for the label to become visible
        await page.waitForTimeout(3000); // Wait for 3 seconds
        await expect(label).toBeVisible();
        await expect(label).toHaveText(/This is a/);
  });

    // Button - Not Visible
    test('Button is not visible', async ({ page }) => {
        await page.selectOption('select', 'Button');
        await page.getByLabel('Visible').uncheck();
        await page.getByLabel('Enabled').check();
        await page.getByRole('button', { name: 'Apply 3s' }).click();

        const button = page.getByRole('button', { name: 'Button' });
        await expect(button).not.toBeVisible();
  });

    // Element with zero size
    test('Input is hidden and has zero size', async ({ page }) => {
        await page.selectOption('select', 'Input');
        await page.getByLabel('Visible').check();
        await page.getByLabel('Non Zero Size').uncheck(); // Simulate zero size
        await page.getByRole('button', { name: 'Apply 5s' }).click();

        const input = page.locator('input[type="text"]');
        await expect(input).not.toBeVisible();
        const box = await input.boundingBox();

        expect(box?.width).toBe(0);
        expect(box?.height).toBe(0);
    });
});