import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'Successful login with correct credentials',
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'Happy path',
        description: 'Basic happy test for login ',
      },
    },
    async ({ page }) => {
      const userId = loginData.userId;
      const userPassword = loginData.password;
      const expectedUserName = 'Jan Demobankowy';

      await loginPage.login(userId, userPassword);
      // await loginPage.loginInput.fill(userId);
      // await loginPage.passwordInput.fill(userPassword);
      // await loginPage.loginButton.click();

      await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
    },
  );

  test(
    'Unsuccessful login with too short username',
    { tag: ['@login'] },
    async ({ page }) => {
      const incorrecrUserId = 'tester';
      const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

      await loginPage.loginInput.fill(incorrecrUserId);
      await loginPage.passwordInput.click();

      await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
    },
  );

  test(
    'Unsuccessful login with too short password',
    { tag: ['@login'] },
    async ({ page }) => {
      const userId = loginData.userId;
      const incorrectPassword = '1234';
      const expectedErrorMessage = 'hasło ma min. 8 znaków';

      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(incorrectPassword);
      await loginPage.passwordInput.blur();

      await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
    },
  );
});
