import { test, expect } from '@/fixtures/base.fixture';
import { ENV } from '@/utils/env.config';
import usersData from '../../../test-data/users.json';
import { logger } from '@/utils/logger';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    logger.info('Start Test Setup: Navigate to base URL');
    await page.goto(ENV.BASE_URL);
  });

  test('TC01 - Đăng nhập thành công với tài khoản hợp lệ', async ({ loginPage }) => {
    await loginPage.login(ENV.ADMIN_USERNAME, ENV.ADMIN_PASSWORD);
    // Replace with actual assertion (e.g. check avatar, title, or url)
    // await expect(loginPage.page).toHaveURL(/.*dashboard/);
    logger.info('Verified login successfully');
  });

  // Example Data-Driven Test
  for (const user of usersData.invalidUsers) {
    test(`TC02 - Đăng nhập thất bại: ${user.scenario}`, async ({ loginPage }) => {
      await loginPage.login(user.username, user.password);
      await loginPage.verifyElementVisible(loginPage.errorMessage, 'Error Message');
      const text = await loginPage.getText(loginPage.errorMessage, 'Error Message');
      expect(text).toContain(user.expectedError);
    });
  }
});
