import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly productImage: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('h2.name');
    this.productPrice = page.locator('h3.price-container');
    this.productDescription = page.locator('#more-information p');
    this.addToCartButton = page.locator('a.btn-success').filter({ hasText: 'Add to cart' });
    this.productImage = page.locator('.product-content img');
  }
}

