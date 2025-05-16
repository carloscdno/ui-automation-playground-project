import { test, expect } from '@playwright/test';

test.describe.only('Sample App', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://uitestingplayground.com');
        const urlLink = page.locator('[href="/sampleapp"]');
        await urlLink.click();
        await page.waitForSelector('h3:has-text("Sample App")');
    });
    test('Validate successful login', async ({ page }) => {
        const userName = page.locator('input[type="text"]');
        await userName.fill('carlos');
        const password = page.locator('input[type="password"]');
        await password.fill('pwd');
        const loginButton = page.locator('#login');
        await loginButton.click();
        // Assert successful login
        const successMessage = page.locator('#loginstatus');
        await page.waitForSelector('#loginstatus', { state: 'visible', timeout: 5000 });
        await expect(successMessage).toHaveText(/Welcome, /);
    });

    test('Validate successful logout', async ({ page }) => {
        const userName = page.locator('input[type="text"]');
        await userName.fill('carlos');
        const password = page.locator('input[type="password"]');
        await password.fill('pwd');
        const dynButton = page.locator('#login');
        await dynButton.click();
         
        // Check initial state is Log Out
        await expect(dynButton).toHaveText('Log Out');
  
        // Click the logout button
        await dynButton.click();

        // Verify post-logout state
        await expect(dynButton).toHaveText('Log In');
  
        // Validate logout confirmation message
        const logoutMessage = page.locator('#loginstatus');
        await expect(logoutMessage).toHaveText(/User logged out/);
    });

    test('Invalid login with empty fields', async ({ page }) => {
        const userName = page.locator('input[type="text"]');
        await userName.fill('');
        const password = page.locator('input[type="password"]');
        await password.fill('');
        const loginButton = page.locator('#login');
        await loginButton.click();
        // Assert invalid login
        const msg = page.locator('#loginstatus');
        await page.waitForSelector('#loginstatus', { state: 'visible', timeout: 5000 });
        await expect(msg).toHaveText(/Invalid username/);
    });
    test('Invalid login with wrong password', async ({ page }) => {
        const userName = page.locator('input[type="text"]');
        await userName.fill('carlos');
        const password = page.locator('input[type="password"]');
        await password.fill('test123');
        const loginButton = page.locator('#login');
        await loginButton.click();
        // Assert invalid login
        const msg = page.locator('#loginstatus');
        await page.waitForSelector('#loginstatus', { state: 'visible', timeout: 5000 });
        await expect(msg).toHaveText(/Invalid/);
    });
});