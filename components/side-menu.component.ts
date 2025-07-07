import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  paymentbutton: Locator;

  constructor(private page: Page) {
    this.paymentbutton = this.page.getByRole('link', { name: 'płatności' });
  }
}
