import { Page, Locator } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  receiverSelect: Locator;
  amountInput: Locator;
  titleInput: Locator;
  executeButton: Locator;
  closeButton: Locator;
  messageText: Locator;
  topUpreceiver: Locator;
  topUpAmount: Locator;
  topUpAgreement: Locator;
  topUpButton: Locator;
  moneyValueText: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    this.receiverSelect = this.page.locator('#widget_1_transfer_receiver');
    this.amountInput = this.page.locator('#widget_1_transfer_amount');
    this.titleInput = this.page.locator('#widget_1_transfer_title');
    this.executeButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.closeButton = this.page.getByTestId('close-button');
    this.messageText = this.page.locator('#show_messages');

    this.topUpreceiver = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreement = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topUpButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.moneyValueText = this.page.locator('#money_value');
  }

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.receiverSelect.selectOption(receiverId);
    await this.amountInput.fill(transferAmount);
    await this.titleInput.fill(transferTitle);

    await this.executeButton.click();
    await this.closeButton.click();
  }

  async executeMobileTopUp(
    topUpreceiver: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.topUpreceiver.selectOption(topUpreceiver);
    await this.topUpAmount.fill(topUpAmount);
    await this.topUpAgreement.click();
    await this.topUpButton.click();

    await this.closeButton.click();
  }
}
