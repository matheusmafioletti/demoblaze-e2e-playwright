export class Constants {
  static readonly BASE_URL = 'https://www.demoblaze.com';
  
  static readonly TIMEOUTS = {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
  };

  static readonly PRODUCTS = {
    LUMIA_1520: 'Nokia lumia 1520',
    MACBOOK_AIR: 'MacBook air',
    GALAXY_S6: 'Samsung galaxy s6',
    APPLE_MONITOR: 'Apple monitor 24'
  };

  static readonly CATEGORIES = {
    PHONES: 'Phones',
    LAPTOPS: 'Laptops',
    MONITORS: 'Monitors',
  };

  static readonly MESSAGES = {
    SIGNUP_SUCCESS: 'Sign up successful.',
    USER_ALREADY_EXISTS: 'This user already exist.',
    LOGIN_SUCCESS: 'Login successful.',
    WRONG_PASSWORD: 'Wrong password.',
    USER_NOT_EXIST: 'User does not exist.',
    PRODUCT_ADDED: 'Product added.',
    ORDER_PLACED: 'Thank you for your purchase!',
  };
}

