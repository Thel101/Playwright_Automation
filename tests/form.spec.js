import { test, expect } from '@playwright/test';

test.describe('Form Tests', () => {
    const sampleString = 'Welcome to LambdaTest';

    test('should fill form and validate input', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');

        await test.step('check url', async () => {
            await expect(page).toHaveURL(/simple-form-demo/);
        });

        await test.step('form filling', async () => {
            await page.fill('#user-message', sampleString);
            await page.click('#showInput');
            await expect(page.locator('#message')).toHaveText(sampleString);
        });
    });
});