import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // REPLACE: Update locator after inspecting actual DOM
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button:has-text("Đăng nhập"), input[type="submit"][value="Đăng nhập"]').first();
    this.errorMessage = page.locator('span:has-text("không đúng"), .alert-danger, .error-message'); // Support Keycloak span or default error classes
  }

  async login(username: string, password: string) {
    try {
      const systemAccountBtn = this.page.getByText('Tài khoản cấp bởi hệ thống');
      await systemAccountBtn.waitFor({ state: 'visible', timeout: 5000 });
      await systemAccountBtn.click();
    } catch (e) {
      // Ignore if the button is not present (e.g. if already selected or different login page)
    }

    await this.typeText(this.usernameInput, username, 'Username Input');
    await this.typeText(this.passwordInput, password, 'Password Input');
    await this.clickElement(this.loginButton, 'Login Button');
  }
}
