import { Page, Locator } from '@playwright/test';

export class PulpitPage {
  receiverSelect: Locator;
  amountInput: Locator;
  titleInput: Locator;
  executeButton: Locator;
  closeButton: Locator;

  constructor(private page: Page) {
    this.receiverSelect = page.locator('#widget_1_transfer_receiver');
    this.amountInput = page.locator('#widget_1_transfer_amount');
    this.titleInput = page.locator('#widget_1_transfer_title');
    this.executeButton = page.getByRole('button', { name: 'wykonaj' });
    this.closeButton = page.getByTestId('close-button');
  }
}
