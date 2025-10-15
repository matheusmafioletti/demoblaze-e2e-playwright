import { test, expect } from '../fixtures/test.fixture';
import { Constants } from '../utils/Constants';
import { WaitHelper } from '../utils/WaitHelper';

test.describe('Homepage - Basic Elements', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('Should load homepage successfully', async ({ homePage }) => {
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.signupLink).toBeVisible();
    await expect(homePage.cartLink).toBeVisible();
  });

  test('Should load homepage and display categories section', async ({ homePage }) => {
    await expect(homePage.categoriesSection).toBeVisible();
    await expect(homePage.categoryLink).toHaveText([
      Constants.CATEGORIES.PHONES,
      Constants.CATEGORIES.LAPTOPS,
      Constants.CATEGORIES.MONITORS
    ]);
  });

  test('Should load homepage and display products', async ({ homePage }) => {
    await expect(homePage.productsContainer).toBeVisible();
    await expect(homePage.productContainer).toHaveCount(9);
  });

  test('Should load homepage and wait for carousel image to change', async ({ homePage }) => {
    await expect(homePage.carousel).toBeVisible();
    await expect(homePage.carouselItem).toHaveCount(3);
    const initialActiveItem = await homePage.carouselImage.getAttribute('src');
    const newActiveItem = await WaitHelper.waitForAttributeChange(
      homePage.carouselImage,
      'src',
      initialActiveItem!,
      Constants.TIMEOUTS.MEDIUM
    );
    expect(initialActiveItem).not.toBe(newActiveItem);
    await expect(homePage.carouselActiveItem).toHaveCount(1);
  });

  test('Should load homepage and click on next carousel item', async ({ homePage }) => {
    await expect(homePage.carousel).toBeVisible();
    await expect(homePage.carouselItem).toHaveCount(3);
    const initialActiveItem = await homePage.carouselImage.getAttribute('src');
    await homePage.carouselNextButton.click();
    const newActiveItem = await WaitHelper.waitForAttributeChange(
      homePage.carouselImage,
      'src',
      initialActiveItem!,
      Constants.TIMEOUTS.MEDIUM
    );
    expect(initialActiveItem).not.toBe(newActiveItem);
  });

  test('Should load homepage and click on previous carousel item', async ({ homePage }) => {
    await expect(homePage.carousel).toBeVisible();
    await expect(homePage.carouselItem).toHaveCount(3);
    const initialActiveItem = await homePage.carouselImage.getAttribute('src');
    await homePage.carouselPrevButton.click();
    const newActiveItem = await WaitHelper.waitForAttributeChange(
      homePage.carouselImage,
      'src',
      initialActiveItem!,
      Constants.TIMEOUTS.MEDIUM
    ); 
    expect(initialActiveItem).not.toBe(newActiveItem);
  });

  test('Should load homepage and click on next page, and previous page', async ({ homePage }) => {
    await expect(homePage.pageNextButton).toBeVisible();
    await expect(homePage.pageProducts.first()).toHaveText(Constants.PRODUCTS.GALAXY_S6);
    await homePage.pageNextButton.click();
    await expect(homePage.pageProducts.first()).toHaveText(Constants.PRODUCTS.APPLE_MONITOR);
    await homePage.pagePrevButton.click();
    await expect(homePage.pageProducts.first()).toHaveText(Constants.PRODUCTS.LUMIA_1520);
  });

});

