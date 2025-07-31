import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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