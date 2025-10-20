import { test, expect } from '../fixtures/test.fixture';
import { allure } from 'allure-playwright';

/**
 * Example test file demonstrating Allure annotations and features
 * 
 * This file shows how to:
 * - Add descriptions and labels
 * - Attach screenshots and data
 * - Create test steps
 * - Organize tests with severity and epics
 */

test.describe('Allure Features Example', () => {
  
  test('Example with full Allure annotations', async ({ homePage, page }) => {
    // Add test description
    await allure.description('This test demonstrates all Allure annotation capabilities');
    
    // Add labels for better organization
    await allure.epic('E-Commerce');
    await allure.feature('Homepage');
    await allure.story('User Navigation');
    await allure.severity('critical');
    await allure.owner('QA Team');
    await allure.tag('smoke', 'regression');
    
    // Add custom labels
    await allure.label('browser', 'chromium');
    await allure.label('environment', 'production');
    
    // Step 1: Navigate to homepage
    await allure.step('Navigate to homepage', async () => {
      await homePage.goto();
      await allure.attachment('Homepage URL', page.url(), 'text/plain');
    });
    
    // Step 2: Verify navigation elements
    await allure.step('Verify navigation elements are visible', async () => {
      await expect(homePage.loginLink).toBeVisible();
      await expect(homePage.signupLink).toBeVisible();
      await expect(homePage.cartLink).toBeVisible();
      
      // Attach screenshot
      const screenshot = await page.screenshot();
      await allure.attachment('Navigation Screenshot', screenshot, 'image/png');
    });
    
    // Step 3: Verify categories
    await allure.step('Verify product categories', async () => {
      await expect(homePage.categoriesSection).toBeVisible();
      
      // Get categories and attach as JSON
      const categories = await homePage.categoryLink.allTextContents();
      await allure.attachment('Categories List', JSON.stringify(categories, null, 2), 'application/json');
    });
    
    // Add link to related documentation
    await allure.link('https://www.demoblaze.com', 'Application URL', 'test-case');
  });
  
  test('Example with test steps and parameters', async ({ homePage }) => {
    await allure.epic('E-Commerce');
    await allure.feature('Product Catalog');
    await allure.story('Product Display');
    await allure.severity('normal');
    
    // Add test parameters
    await allure.parameter('expected_products', 9);
    await allure.parameter('page', 1);
    
    await allure.step('Load homepage', async () => {
      await homePage.goto();
    });
    
    await allure.step('Verify products are displayed', async () => {
      await expect(homePage.productsContainer).toBeVisible();
      await expect(homePage.productContainer).toHaveCount(9);
    });
  });
  
  test('Example with environment info', async ({ homePage, page }) => {
    await allure.epic('E-Commerce');
    await allure.feature('Homepage');
    await allure.severity('minor');
    
    // Attach environment information
    await allure.attachment(
      'Test Environment',
      JSON.stringify({
        baseURL: page.context().browser()?.version(),
        viewport: page.viewportSize(),
        userAgent: await page.evaluate(() => navigator.userAgent)
      }, null, 2),
      'application/json'
    );
    
    await homePage.goto();
    await expect(homePage.loginLink).toBeVisible();
  });
});

/**
 * Allure Annotations Reference:
 * 
 * Organizational:
 * - allure.epic() - High-level feature (e.g., 'E-Commerce', 'User Management')
 * - allure.feature() - Feature being tested (e.g., 'Login', 'Checkout')
 * - allure.story() - User story or scenario (e.g., 'Successful Login')
 * 
 * Metadata:
 * - allure.severity() - Test importance: 'blocker', 'critical', 'normal', 'minor', 'trivial'
 * - allure.owner() - Test owner or author
 * - allure.tag() - Custom tags for filtering
 * - allure.label() - Custom key-value labels
 * 
 * Documentation:
 * - allure.description() - Detailed test description
 * - allure.link() - Links to issues, requirements, documentation
 * - allure.issue() - Link to issue tracker
 * - allure.tms() - Link to test management system
 * 
 * Runtime:
 * - allure.step() - Logical test steps
 * - allure.attachment() - Attach files, screenshots, logs
 * - allure.parameter() - Test parameters and data
 * 
 * Benefits:
 * - Better test organization and filtering
 * - Enhanced reporting with rich metadata
 * - Easier debugging with attachments
 * - Professional stakeholder reports
 * - Historical trends and analytics
 */

