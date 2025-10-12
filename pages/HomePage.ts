import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly cartLink: Locator;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutLink: Locator;
  readonly categoriesSection: Locator;
  readonly productsContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = page.locator('#login2');
    this.signupLink = page.locator('#signin2');
    this.cartLink = page.locator('#cartur');
    this.homeLink = page.locator('a.nav-link').filter({ hasText: 'Home' });
    this.contactLink = page.locator('a[data-target="#exampleModal"]');
    this.aboutLink = page.locator('a[data-target="#videoModal"]');
    this.categoriesSection = page.locator('#cat');
    this.productsContainer = page.locator('#tbodyid');
  }

  async goto() {
    await this.navigate('/');
  }
}

