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

  async waitForModalToOpen() {
    await this.signupModal.waitFor({ state: 'visible' });
  }

  async fillSignupForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submitSignup() {
    await this.signupButton.click();
  }

  async signup(username: string, password: string) {
    await this.fillSignupForm(username, password);
    await this.submitSignup();
  }

  async closeModal() {
    await this.closeButton.click();
    await this.signupModal.waitFor({ state: 'hidden' });
  }
}

