export class TestDataGenerator {
  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static generateEmail(): string {
    return `testuser_${Date.now()}@yopmail.com`;
  }

  static generatePhone(): string {
    return `09${Math.floor(10000000 + Math.random() * 90000000)}`;
  }
}
