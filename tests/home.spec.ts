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

  test('Should navigate between pages using next and previous buttons', async ({ homePage }) => {
    await expect(homePage.pageNextButton).toBeVisible();
    await expect(homePage.pageProducts.first()).toHaveText(Constants.PRODUCTS.GALAXY_S6);
    await homePage.goToNextPage();
    await expect(homePage.pageProducts.first()).toHaveText(Constants.PRODUCTS.APPLE_MONITOR);
    await homePage.goToPreviousPage();
    await expect(homePage.pageProducts.first()).toHaveText(Constants.PRODUCTS.LUMIA_1520);
  });

});

test.describe('Homepage - Carousel', () => {
  test.beforeEach(async ({ homePage, isMobile }) => {
    test.skip(isMobile, 'Carousel are not displayed on mobile devices');
    await homePage.goto();
  });

  test('Should automatically change carousel image after timeout', async ({ homePage }) => {
    await expect(homePage.carousel).toBeVisible();
    await expect(homePage.carouselItem).toHaveCount(3);
    const initialImage = await homePage.getCurrentCarouselImage();
    const newImage = await WaitHelper.waitForAttributeChange(
      homePage.carouselImage,
      'src',
      initialImage,
      Constants.TIMEOUTS.MEDIUM
    );
    expect(initialImage).not.toBe(newImage);
    await expect(homePage.carouselActiveItem).toHaveCount(1);
  });

  test('Should navigate to next carousel item', async ({ homePage }) => {
    await expect(homePage.carousel).toBeVisible();
    await expect(homePage.carouselItem).toHaveCount(3);
    const initialImage = await homePage.getCurrentCarouselImage();
    await homePage.nextCarouselItem();
    const newImage = await WaitHelper.waitForAttributeChange(
      homePage.carouselImage,
      'src',
      initialImage,
      Constants.TIMEOUTS.MEDIUM
    );
    expect(initialImage).not.toBe(newImage);
  });

  test('Should navigate to previous carousel item', async ({ homePage }) => {
    await expect(homePage.carousel).toBeVisible();
    await expect(homePage.carouselItem).toHaveCount(3);
    const initialImage = await homePage.getCurrentCarouselImage();
    await homePage.previousCarouselItem();
    const newImage = await WaitHelper.waitForAttributeChange(
      homePage.carouselImage,
      'src',
      initialImage,
      Constants.TIMEOUTS.MEDIUM
    );
    expect(initialImage).not.toBe(newImage);
  });

});
