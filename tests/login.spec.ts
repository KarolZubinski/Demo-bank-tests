import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successful login with correct credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'Jan Demobankowy';

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Unsuccessful login with too short username', async ({ page }) => {
    const incorrecrUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    await page.getByTestId('login-input').fill(incorrecrUserId);
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage
    );
  });

  test('Unsuccessful login with too short password', async ({ page }) => {
    const userId = loginData.userId;
    const incorrectPassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage
    );
  });
});
