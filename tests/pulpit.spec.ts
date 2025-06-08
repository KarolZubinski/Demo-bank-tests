import { test, expect } from '@playwright/test';

test.describe('pulpit tests', () => {
     test.only('quick payment with coorect data', async ({ page }) => {
          await page.goto('https://demo-bank.vercel.app/');
          await page.getByTestId('login-input').fill('testerLO');
          await page.getByTestId('password-input').fill('1wqr324r435');
          await page.getByTestId('login-button').click();

          await page.waitForLoadState("domcontentloaded");

          await page.locator('#widget_1_transfer_receiver').selectOption('2');
          await page.locator('#widget_1_transfer_amount').fill('150');
          await page.locator('#widget_1_transfer_title').fill('pizza');

          await page.getByRole('button', { name: 'wykonaj' }).click();
          await page.getByTestId('close-button').click();
          await page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 150,00 - Zwrot' });

          await expect(page.locator("#show_messages")).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza');
     });

     test('Successful mobile top-up', async ({ page }) => {
          await page.goto('https://demo-bank.vercel.app/');
          await page.getByTestId('login-input').click();
          await page.getByTestId('login-input').fill('testerLO');
          await page.getByTestId('password-input').click();
          await page.getByTestId('password-input').fill('12345678');
          await page.getByTestId('login-button').click();
          await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
          await page.locator('#widget_1_topup_amount').click();
          await page.locator('#widget_1_topup_amount').fill('40');
          await page.locator('#uniform-widget_1_topup_agreement span').click();
          await page.getByRole('button', { name: 'doładuj telefon' }).click();
          await page.getByTestId('close-button').click();
          await page.getByRole('link', { name: 'Doładowanie wykonane! 40,' }).click();
     });     
});