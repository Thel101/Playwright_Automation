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