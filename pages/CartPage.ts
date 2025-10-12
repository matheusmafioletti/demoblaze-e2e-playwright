import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly placeOrderButton: Locator;
  readonly totalPrice: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('#tbodyid');
    this.placeOrderButton = page.locator('button.btn-success').filter({ hasText: 'Place Order' });
    this.totalPrice = page.locator('#totalp');
    this.deleteButtons = page.locator('a').filter({ hasText: 'Delete' });
  }

  async goto() {
    await this.navigate('/cart.html');
  }
}

