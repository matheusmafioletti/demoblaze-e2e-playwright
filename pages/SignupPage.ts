import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
  readonly signupModal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signupModal = page.locator('#signInModal');
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signupButton = page.locator('button').filter({ hasText: 'Sign up' });
    this.closeButton = this.signupModal.locator('button.close');
  }

  async openSignupModal() {
    await this.page.locator('#signin2').click();
    await this.signupModal.waitFor({ state: 'visible' });
  }
}

