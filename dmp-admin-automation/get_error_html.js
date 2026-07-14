const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://dmp.vtscloud.vn/admin');
  await page.getByText('Tài khoản cấp bởi hệ thống').click();
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('wrongpassword123');
  await page.locator('button:has-text("Đăng nhập"), input[type="submit"][value="Đăng nhập"]').first().click();
  await page.waitForTimeout(3000);
  const content = await page.content();
  fs.writeFileSync('error_page.html', content);
  await browser.close();
})();
