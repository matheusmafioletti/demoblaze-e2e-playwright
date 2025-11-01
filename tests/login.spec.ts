import { test, expect } from "@fixtures/test.fixture";
import { TestDataGenerator } from "@utils/TestDataGenerator";

test.describe('Login Modal', () => {
    test.beforeEach(async ({ homePage, loginPage }) => {
        await homePage.goto();
        await homePage.openLoginModal();
        await loginPage.waitForModalToOpen();
    });

    test('Should display login modal when clicking login link', async ({ loginPage }) => {
        await expect(loginPage.loginModal).toBeVisible();
        await expect(loginPage.loginModal).toHaveClass(/show/);
    });

    test('Should display all login form elements', async ({ loginPage }) => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.closeButton).toBeVisible();
    });

    test('Should login successfully with valid credentials', async ({ page, loginPage, homePage }) => {
        const username = 'teste';
        const password = 'teste';
        await loginPage.fillLoginForm(username, password);
        await loginPage.submitLogin();
        await expect(loginPage.loginModal).not.toBeVisible();
        const logoutLink = page.locator('#logout2');
        await expect(logoutLink).toBeVisible();
        const welcomeLink = page.locator('#nameofuser');
        await expect(welcomeLink).toContainText('Welcome');
    });

    test('Should show error with invalid credentials', async ({ page, loginPage }) => {
        const username = TestDataGenerator.generateRandomUsername();
        const password = TestDataGenerator.generateRandomPassword();
        const dialogPromise = loginPage.waitForDialog();
        await loginPage.fillLoginForm(username, password);
        await loginPage.submitLogin();
        const alertMessage = await dialogPromise;
        expect(alertMessage).toBe('User does not exist.');
    });

    test('Should show error with wrong password', async ({ page, loginPage }) => {
        const username = 'testuser123';
        const password = 'wrongpassword';
        const dialogPromise = loginPage.waitForDialog();
        await loginPage.fillLoginForm(username, password);
        await loginPage.submitLogin();
        const alertMessage = await dialogPromise;
        expect(alertMessage).toBe('Wrong password.');
    });

    test('Should fill username field correctly', async ({ loginPage }) => {
        const username = 'testuser123';
        await loginPage.usernameInput.fill(username);
        await expect(loginPage.usernameInput).toHaveValue(username);
    });

    test('Should fill password field correctly', async ({ loginPage }) => {
        const password = 'testpass123';
        await loginPage.passwordInput.fill(password);
        await expect(loginPage.passwordInput).toHaveValue(password);
    });

    test('Should close modal when clicking close button', async ({ loginPage }) => {
        await expect(loginPage.loginModal).toBeVisible();
        await loginPage.closeModal();
        await expect(loginPage.loginModal).not.toBeVisible();
    });

    test('Should close and reopen modal successfully', async ({ homePage, loginPage }) => {
        await loginPage.closeModal();
        await expect(loginPage.loginModal).not.toBeVisible();
        await homePage.openLoginModal();
        await loginPage.waitForModalToOpen();
        await expect(loginPage.loginModal).toBeVisible();
        await expect(loginPage.usernameInput).toBeEmpty();
        await expect(loginPage.passwordInput).toBeEmpty();
    });

});

