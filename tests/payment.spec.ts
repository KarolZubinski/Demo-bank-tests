import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit';

test.describe('payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentbutton.click();
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReciver = 'Jan Nowak';
    const transferAcoount = '01 2345 6789 0123 4567 8901 23456';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    //Act
    const paymentPage = new PaymentPage(page);

    await paymentPage.transferReciver.fill(transferReciver);
    await paymentPage.transferAcoount.fill(transferAcoount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();
  
    //Assert
    await expect(paymentPage.showMessage).toHaveText(expectedMessage);
  });
});
