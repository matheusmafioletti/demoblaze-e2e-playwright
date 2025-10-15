import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly cartLink: Locator;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutLink: Locator;
  readonly categoriesSection: Locator;
  readonly productsContainer: Locator;
  readonly categoryLink: Locator;
  readonly productContainer: Locator;
  readonly carousel: Locator;
  readonly carouselItem: Locator;
  readonly carouselActiveItem: Locator;
  readonly carouselImage: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselPrevButton: Locator;
  readonly pageNextButton: Locator;
  readonly pagePrevButton: Locator;
  readonly pageProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = page.locator('#login2');
    this.signupLink = page.locator('#signin2');
    this.cartLink = page.locator('#cartur');
    this.homeLink = page.locator('a.nav-link').filter({ hasText: 'Home' });
    this.contactLink = page.locator('a[data-target="#exampleModal"]');
    this.aboutLink = page.locator('a[data-target="#videoModal"]');
    this.categoriesSection = page.locator('#cat');
    this.categoryLink = page.locator('#itemc');
    this.productsContainer = page.locator('#tbodyid');
    this.productContainer = page.locator('.card-block');
    this.carousel = page.locator('#contcar');
    this.carouselItem = page.locator('.carousel-item');
    this.carouselActiveItem = page.locator('.carousel-item.active');
    this.carouselImage = page.locator('.carousel-item.active img');
    this.carouselNextButton = page.locator('.carousel-control-next');
    this.carouselPrevButton = page.locator('.carousel-control-prev');
    this.pageNextButton = page.locator('#next2');
    this.pagePrevButton = page.locator('#prev2');
    this.pageProducts = page.locator('#tbodyid .card-title');
  }

  async goto() {
    await this.navigate('/');
  }
}

