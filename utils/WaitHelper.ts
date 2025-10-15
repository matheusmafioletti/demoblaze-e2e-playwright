import { Page, Locator } from '@playwright/test';

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

  static async waitForAttributeChange(
    locator: Locator,
    attribute: string,
    initialValue: string,
    timeout: number = 10000
  ): Promise<string> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentValue = await locator.getAttribute(attribute);
      if (currentValue !== initialValue) {
        return currentValue || '';
      }
      await this.waitForMilliseconds(100);
    }

    throw new Error(`Timeout waiting for attribute "${attribute}" to change from "${initialValue}" after ${timeout}ms`);
  }

  static async waitForTextChange(
    locator: Locator,
    initialText: string,
    timeout: number = 10000
  ): Promise<string> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentText = await locator.textContent();
      if (currentText !== initialText) {
        return currentText || '';
      }
      await this.waitForMilliseconds(100);
    }

    throw new Error(`Timeout waiting for text to change from "${initialText}" after ${timeout}ms`);
  }

  static async waitForElementCount(
    locator: Locator,
    expectedCount: number,
    timeout: number = 10000
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentCount = await locator.count();
      if (currentCount === expectedCount) {
        return;
      }
      await this.waitForMilliseconds(100);
    }

    const finalCount = await locator.count();
    throw new Error(`Timeout waiting for element count to be ${expectedCount}. Current count: ${finalCount}`);
  }

  static async waitForClassToBeAdded(
    locator: Locator,
    className: string,
    timeout: number = 10000
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const classes = await locator.getAttribute('class');
      if (classes && classes.split(' ').includes(className)) {
        return;
      }
      await this.waitForMilliseconds(100);
    }

    throw new Error(`Timeout waiting for class "${className}" to be added after ${timeout}ms`);
  }

  static async waitForClassToBeRemoved(
    locator: Locator,
    className: string,
    timeout: number = 10000
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const classes = await locator.getAttribute('class');
      if (!classes || !classes.split(' ').includes(className)) {
        return;
      }
      await this.waitForMilliseconds(100);
    }

    throw new Error(`Timeout waiting for class "${className}" to be removed after ${timeout}ms`);
  }

  static async waitForValueChange(
    locator: Locator,
    initialValue: string,
    timeout: number = 10000
  ): Promise<string> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentValue = await locator.inputValue();
      if (currentValue !== initialValue) {
        return currentValue;
      }
      await this.waitForMilliseconds(100);
    }

    throw new Error(`Timeout waiting for value to change from "${initialValue}" after ${timeout}ms`);
  }
}

