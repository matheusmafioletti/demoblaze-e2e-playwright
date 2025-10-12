import { Page } from '@playwright/test';

export class WaitHelper {
  static async waitForSeconds(seconds: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  static async waitForMilliseconds(milliseconds: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static async waitForAlert(page: Page, timeout: number = 5000): Promise<void> {
    await page.waitForEvent('dialog', { timeout });
  }

  static async waitForUrl(page: Page, url: string, timeout: number = 30000): Promise<void> {
    await page.waitForURL(url, { timeout });
  }

  static async waitForUrlContains(page: Page, urlPart: string, timeout: number = 30000): Promise<void> {
    await page.waitForURL(new RegExp(urlPart), { timeout });
  }
}

