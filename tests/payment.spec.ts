import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('payment tests', () => {

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');

    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

  });

test('simple payment', async ({ page }) => {


  });
});
