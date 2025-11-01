import { test, expect } from "@fixtures/test.fixture";
import { TestDataGenerator } from "@utils/TestDataGenerator";

test.describe('Signup Modal', () => {
    test.beforeEach(async ({ homePage, signupPage }) => {
        await homePage.goto();
        await homePage.openSignupModal();
        await signupPage.waitForModalToOpen();
    });

    test('Should display signup modal when clicking signup link', async ({ signupPage }) => {
        await expect(signupPage.signupModal).toBeVisible();
        await expect(signupPage.signupModal).toHaveClass(/show/);
    });

    test('Should display all signup form elements', async ({ signupPage }) => {
        await expect(signupPage.usernameInput).toBeVisible();
        await expect(signupPage.passwordInput).toBeVisible();
        await expect(signupPage.signupButton).toBeVisible();
        await expect(signupPage.closeButton).toBeVisible();
    });

    test('Should signup successfully with valid credentials', async ({ page, signupPage }) => {
        const username = TestDataGenerator.generateRandomUsername();
        const password = TestDataGenerator.generateRandomPassword();
        const dialogPromise = signupPage.waitForDialog();
        await signupPage.fillSignupForm(username, password);
        await signupPage.submitSignup();
        const alertMessage = await dialogPromise;
        expect(alertMessage).toBe('Sign up successful.');
    });

    test('Should show error when username already exists', async ({ page, signupPage }) => {
        const existingUsername = 'testuser123';
        const password = TestDataGenerator.generateRandomPassword();
        const dialogPromise = signupPage.waitForDialog();
        await signupPage.fillSignupForm(existingUsername, password);
        await signupPage.submitSignup();
        const alertMessage = await dialogPromise;
        expect(alertMessage).toBe('This user already exist.');
    });

    test('Should fill username field correctly', async ({ signupPage }) => {
        const username = TestDataGenerator.generateRandomUsername();
        await signupPage.usernameInput.fill(username);
        await expect(signupPage.usernameInput).toHaveValue(username);
    });

    test('Should fill password field correctly', async ({ signupPage }) => {
        const password = TestDataGenerator.generateRandomPassword();
        await signupPage.passwordInput.fill(password);
        await expect(signupPage.passwordInput).toHaveValue(password);
    });

    test('Should close modal when clicking close button', async ({ signupPage }) => {
        await expect(signupPage.signupModal).toBeVisible();
        await signupPage.closeModal();
        await expect(signupPage.signupModal).not.toBeVisible();
    });

    test('Should close and reopen modal successfully', async ({ homePage, signupPage }) => {
        await signupPage.closeModal();
        await expect(signupPage.signupModal).not.toBeVisible();
        await homePage.openSignupModal();
        await signupPage.waitForModalToOpen();
        await expect(signupPage.signupModal).toBeVisible();
        await expect(signupPage.usernameInput).toBeEmpty();
        await expect(signupPage.passwordInput).toBeEmpty();
    });

    test('Should use signup helper method', async ({ page, signupPage }) => {
        const username = TestDataGenerator.generateRandomUsername();
        const password = TestDataGenerator.generateRandomPassword();
        const dialogPromise = signupPage.waitForDialog();
        await signupPage.signup(username, password);
        const alertMessage = await dialogPromise;
        expect(alertMessage).toBe('Sign up successful.');
    });
});

