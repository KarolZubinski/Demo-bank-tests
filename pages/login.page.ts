import { Locator, Page } from '@playwright/test';

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;


  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('login-input');
    this.loginButton = this.page.getByTestId('login-button'); 
    this.passwordInput = this.page.getByTestId('password-input');

  }
}
