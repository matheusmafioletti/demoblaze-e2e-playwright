import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginModal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginModal = page.locator('#logInModal');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button').filter({ hasText: 'Log in' });
    this.closeButton = this.loginModal.locator('button.close');
  }

  async openLoginModal() {
    await this.page.locator('#login2').click();
    await this.loginModal.waitFor({ state: 'visible' });
  }
}

