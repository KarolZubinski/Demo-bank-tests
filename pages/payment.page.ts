import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReciver: Locator;
  transferAcoount: Locator;
  transferAmount: Locator;
  showMessage: Locator;

  constructor(private page: Page) {
    this.transferReciver = this.page.getByTestId('transfer_receiver');
    this.transferAcoount = this.page.getByTestId('form_account_to');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.showMessage = this.page.locator('#show_messages');
  }
}
