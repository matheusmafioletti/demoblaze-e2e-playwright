import { test, expect } from '../fixtures/test.fixture';

test.describe('Demoblaze E2E Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load homepage successfully', async ({ homePage }) => {
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.signupLink).toBeVisible();
    await expect(homePage.cartLink).toBeVisible();
  });
});

