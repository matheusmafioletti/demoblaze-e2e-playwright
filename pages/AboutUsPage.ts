import { Page, Locator } from '@playwright/test';
import { BasePage } from "./BasePage";

export class AboutUsPage extends BasePage {
    readonly aboutUsModal: Locator;
    readonly closeButton: Locator;
    readonly video: Locator;
    readonly modalDialog: Locator;
    readonly modalContent: Locator;

    constructor(page: Page) {
        super(page);
        this.aboutUsModal = page.locator('#videoModal');
        this.closeButton = this.aboutUsModal.locator('button.close');
        this.video = this.aboutUsModal.locator('video');
        this.modalDialog = this.aboutUsModal.locator('.modal-dialog');
        this.modalContent = this.aboutUsModal.locator('.modal-content');
    }

    async waitForModalToOpen() {
        await this.aboutUsModal.waitFor({ state: 'visible' });
    }

    async closeModal() {
        await this.closeButton.click();
        await this.aboutUsModal.waitFor({ state: 'hidden' });
    }
}

