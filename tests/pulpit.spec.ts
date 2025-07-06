import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit';

test.describe('pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test.only('quick payment with coorect data', async ({ page }) => {
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    await page.waitForLoadState('domcontentloaded');

    const pulpitPage = new PulpitPage(page);

    await pulpitPage.receiverSelect.selectOption(receiverId);
    await pulpitPage.amountInput.fill(transferAmount);
    await pulpitPage.titleInput.fill(transferTitle);

    await pulpitPage.executeButton.click();
    await pulpitPage.closeButton.click();

    await expect(pulpitPage.messageText).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test('Successful mobile top-up', async ({ page }) => {
    const topUpreceiver = '500 xxx xxx';
    const topUpAmount = '150';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpreceiver}`;

    await page.waitForLoadState('domcontentloaded');

    const pulpitPage = new PulpitPage(page);

    await pulpitPage.topUpreceiver.selectOption(topUpreceiver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.topUpButton.click();
    // await page.locator('#widget_1_topup_receiver').selectOption(topUpreceiver);
    // await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    // await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await pulpitPage.closeButton.click();
    await page.getByRole('link', {
      name: 'Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx',
    });

    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    const pulpitPage = new PulpitPage(page);
    const topUpreceiver = '500 xxx xxx';
    const topUpAmount = '150';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    await page.waitForLoadState('domcontentloaded');


    await pulpitPage.topUpreceiver.selectOption(topUpreceiver);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.topUpButton.click();
    await pulpitPage.closeButton.click();
    await page.getByRole('link', {
      name: 'Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx',
    });

    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
