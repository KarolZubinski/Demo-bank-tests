import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReciver: Locator;
  transferAcoount: Locator;
  transferAmount: Locator;
  showMessage: Locator;
  transferButton: Locator;
  actionCloseButton: Locator;

  constructor(private page: Page) {
    this.transferReciver = this.page.getByTestId('transfer_receiver');
    this.transferAcoount = this.page.getByTestId('form_account_to');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
    this.actionCloseButton = this.page.getByTestId('close-button');
    this.showMessage = this.page.locator('#show_messages');
  }
}
