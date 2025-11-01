import { test, expect } from "@fixtures/test.fixture";

test.describe('About Us Modal', () => {
    test.beforeEach(async ({ homePage, aboutUsPage }) => {
        await homePage.goto();
        await homePage.openAboutUsModal();
        await aboutUsPage.waitForModalToOpen();
    });

    test('Should display about us modal when clicking about us link', async ({ aboutUsPage }) => {
        await expect(aboutUsPage.aboutUsModal).toBeVisible();
        await expect(aboutUsPage.aboutUsModal).toHaveClass(/show/);
    });

    test('Should display modal content elements', async ({ aboutUsPage }) => {
        await expect(aboutUsPage.modalDialog).toBeVisible();
        await expect(aboutUsPage.modalContent).toBeVisible();
        await expect(aboutUsPage.closeButton).toBeVisible();
        await expect(aboutUsPage.video).toBeVisible();
        const videoCount = await aboutUsPage.video.count();
        expect(videoCount).toBeGreaterThan(0);
    });

    test('Should close modal when clicking close button', async ({ aboutUsPage }) => {
        await expect(aboutUsPage.aboutUsModal).toBeVisible();
        await aboutUsPage.closeModal();
        await expect(aboutUsPage.aboutUsModal).not.toBeVisible();
    });

    test('Should close modal and reopen successfully', async ({ homePage, aboutUsPage }) => {
        await aboutUsPage.closeModal();
        await expect(aboutUsPage.aboutUsModal).not.toBeVisible();
        await homePage.openAboutUsModal();
        await aboutUsPage.waitForModalToOpen();
        await expect(aboutUsPage.aboutUsModal).toBeVisible();
        await expect(aboutUsPage.video).toBeVisible();
    });
});
