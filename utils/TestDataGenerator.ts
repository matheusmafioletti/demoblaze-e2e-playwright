export class TestDataGenerator {
  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static generateRandomEmail(): string {
    return `test${this.generateRandomString(8)}@example.com`;
  }

  static generateRandomUsername(): string {
    return `user${this.generateRandomString(6)}`;
  }

  static generateRandomPassword(): string {
    return `Pass${this.generateRandomString(8)}!`;
  }

  static generateRandomPhoneNumber(): string {
    return `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
  }

  static generateCreditCardNumber(): string {
    const prefix = '4532';
    const randomDigits = Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
    return prefix + randomDigits;
  }

  static getRandomMonth(): string {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    return months[Math.floor(Math.random() * months.length)];
  }

  static getRandomYear(): string {
    const currentYear = new Date().getFullYear();
    const futureYears = 5;
    return (currentYear + Math.floor(Math.random() * futureYears)).toString();
  }
}

