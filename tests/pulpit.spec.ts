     import { test, expect } from '@playwright/test';
     
     test.describe('pulpit tests', () => {
        test('test', async ({ page }) => {
            await page.goto('https://demo-bank.vercel.app/');
            await page.getByTestId('login-input').fill('testerLO');
            await page.getByTestId('password-input').fill('1wqr324r435');
            await page.getByTestId('login-button').click();

            await page.goto('https://demo-bank.vercel.app/pulpit.html');
            await page.locator('#widget_1_transfer_receiver').selectOption('2');
            await page.locator('#widget_1_transfer_amount').click();
            await page.locator('#widget_1_transfer_amount').fill('150');
            await page.locator('#widget_1_transfer_title').click();
            await page.locator('#widget_1_transfer_title').fill('Zwrot');
            await page.getByRole('button', { name: 'wykonaj' }).click();
            await page.getByTestId('close-button').click();
            await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();
});

     });