import { expect, test } from "@fixtures/test.fixture";
import { TestDataGenerator } from "@utils/TestDataGenerator";

test.describe('Contact Page', () => {
    test.beforeEach(async ({ homePage, contactPage }) => {
        await homePage.goto();
        await homePage.openContactModal();
        await contactPage.waitForModalToOpen();
    });

    test('Should display contact modal when clicking contact link', async ({ contactPage }) => {
        await expect(contactPage.contactModal).toBeVisible();
        await expect(contactPage.emailInput).toBeVisible();
        await expect(contactPage.nameInput).toBeVisible();
        await expect(contactPage.messageInput).toBeVisible();
        await expect(contactPage.sendButton).toBeVisible();
    });

    test('Should submit contact form successfully', async ({ contactPage }) => {
        const dialogPromise = contactPage.waitForDialog();
        await contactPage.fillContactForm(
            TestDataGenerator.generateRandomEmail(),
            TestDataGenerator.generateRandomUsername(),
            'This is a test message'
        );
        await contactPage.submitContact();
        const alertMessage = await dialogPromise;
        expect(alertMessage).toBe('Thanks for the message!!');
    });

    test('Should close contact modal', async ({ contactPage }) => {
        await expect(contactPage.contactModal).toBeVisible();
        await contactPage.closeModal();
        await expect(contactPage.contactModal).not.toBeVisible();
    });
});