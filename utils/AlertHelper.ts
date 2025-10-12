import { Page, Dialog } from '@playwright/test';

export class AlertHelper {
  static async handleAlert(page: Page, action: 'accept' | 'dismiss' = 'accept'): Promise<string> {
    return new Promise((resolve) => {
      page.once('dialog', async (dialog: Dialog) => {
        const message = dialog.message();
        if (action === 'accept') {
          await dialog.accept();
        } else {
          await dialog.dismiss();
        }
        resolve(message);
      });
    });
  }

  static async handleAlertWithText(page: Page, inputText: string): Promise<string> {
    return new Promise((resolve) => {
      page.once('dialog', async (dialog: Dialog) => {
        const message = dialog.message();
        await dialog.accept(inputText);
        resolve(message);
      });
    });
  }

  static getAlertListener(page: Page): Promise<string> {
    return new Promise((resolve) => {
      page.once('dialog', async (dialog: Dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
  }
}

