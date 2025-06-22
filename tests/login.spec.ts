import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  
  test.beforeEach(async ({ page }) => {
    
    await page.goto('/')

  });

  test.only('Successful login with correct credentials', async ({ page }) => {
    const userId = 'testerLO';
    const userPassword = '1wqr324r435';
    const expectedUserName = 'Jan Demobankowy';

    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
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
    const userId = 'testerLO';
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
