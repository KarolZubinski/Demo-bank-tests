import { Page } from "@playwright/test";

class LoginPage {
  constructor(privat page: Page) {}

loginInput = this.page.getByTestId('login-input')
    // await page.getByTestId('login-input').fill(userId);

}
