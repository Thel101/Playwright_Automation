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

import { test, expect } from '@playwright/test';

test('Sliders Tests', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');

    const slider = page.locator('input[type="range"][value="15"]');
    // Use fill() method for range sliders - it's more reliable
    await slider.fill('95');
    await expect(slider).toHaveValue('95');

    const sliderValue = page.locator('div#slider3').locator('output');
    await expect(sliderValue).toBeVisible();
    await expect(sliderValue).toHaveText('95');
});
test('Form submission', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');

    await page.getByRole('textbox', { name: 'Name' }).fill('Phyu');

    await page.getByRole('textbox', { name: 'Email*' }).fill('phyu@gmail.com');

    await page.getByRole('textbox', { name: 'Password*' }).fill('Def@u1tPW');

    await page.getByRole('textbox', { name: 'Company' }).fill('AUMP');

    await page.getByRole('textbox', { name: 'Website' }).fill('aump.com.mm');

    await page.getByRole('combobox').selectOption('AI');

    await page.getByRole('textbox', { name: 'City', exact: true }).fill('Bangkok');

    await page.getByRole('textbox', { name: 'Address 1' }).fill('no.4 street');

    await page.getByRole('textbox', { name: 'Address 2' }).fill('2952/206');

    await page.getByRole('textbox', { name: 'City* State*' }).fill('Bangkok');

    await page.getByRole('textbox', { name: 'Zip Code*' }).fill('10260');
    await page.getByRole('button', { name: 'Submit' }).click();

    const successMessage = await page.getByText('Thanks for contacting us, we will get back to you shortly');
    await expect(successMessage).toBeVisible();
});