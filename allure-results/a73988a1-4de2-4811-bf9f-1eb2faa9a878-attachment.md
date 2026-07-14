# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\login.spec.ts >> Login Feature >> TC02 - Đăng nhập thất bại: Tài khoản không tồn tại
- Location: dmp-admin-automation\src\tests\auth\login.spec.ts:21:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('span:has-text("không đúng"), .alert-danger, .error-message')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('span:has-text("không đúng"), .alert-danger, .error-message')
    - waiting for" https://dmp.vtscloud.vn/admin" navigation to finish...
    - navigated to "https://dmp.vtscloud.vn/admin"

```

```yaml
- button "×"
- text: "Thông tin đăng nhập không đúng. Vui lòng thử lại Hệ Thống Tổng Hợp, Phân Tích Và Trực Quan Hóa Dữ Liệu Tên đăng nhập: "
- textbox
- text: "Mật khẩu: "
- textbox
- button "Đăng nhập"
- paragraph: hoặc đăng nhập với
- text: SSO BXD 
- link "":
  - /url: /user_manual/
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { logger } from '@/utils/logger';
  3  | 
  4  | export class BasePage {
  5  |   readonly page: Page;
  6  | 
  7  |   constructor(page: Page) {
  8  |     this.page = page;
  9  |   }
  10 | 
  11 |   async navigate(url: string) {
  12 |     logger.info(`Navigating to ${url}`);
  13 |     await this.page.goto(url);
  14 |   }
  15 | 
  16 |   async clickElement(locator: Locator, description: string) {
  17 |     logger.info(`Clicking on ${description}`);
  18 |     await locator.waitFor({ state: 'visible' });
  19 |     await locator.click();
  20 |   }
  21 | 
  22 |   async typeText(locator: Locator, text: string, description: string) {
  23 |     logger.info(`Typing "${text}" into ${description}`);
  24 |     await locator.waitFor({ state: 'visible' });
  25 |     await locator.fill(text);
  26 |   }
  27 | 
  28 |   async getText(locator: Locator, description: string): Promise<string> {
  29 |     logger.info(`Getting text from ${description}`);
  30 |     await locator.waitFor({ state: 'visible' });
  31 |     return (await locator.textContent())?.trim() || '';
  32 |   }
  33 | 
  34 |   async verifyElementVisible(locator: Locator, description: string) {
  35 |     logger.info(`Verifying ${description} is visible`);
> 36 |     await expect(locator).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  37 |   }
  38 | }
  39 | 
```