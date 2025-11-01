import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly contactModal: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.contactModal = page.locator('#exampleModal');
    this.emailInput = page.locator('#recipient-email');
    this.nameInput = page.locator('#recipient-name');
    this.messageInput = page.locator('#message-text');
    this.sendButton = page.locator('button').filter({ hasText: 'Send message' });
    this.closeButton = this.contactModal.locator('button.close');
  }

  async waitForModalToOpen() {
    await this.contactModal.waitFor({ state: 'visible' });
  }

  async fillContactForm(email: string, name: string, message: string) {
    await this.emailInput.fill(email);
    await this.nameInput.fill(name);
    await this.messageInput.fill(message);
  }

  async submitContact() {
    await this.sendButton.click();
  }

  async closeModal() {
    await this.closeButton.click();
    await this.contactModal.waitFor({ state: 'hidden' });
  }
}
