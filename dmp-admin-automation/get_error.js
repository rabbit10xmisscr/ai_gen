const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://dmp.vtscloud.vn/admin');
  await page.waitForTimeout(2000);
  
  // If SSO BXD button exists, click it
  const ssoBtn = page.getByText('SSO BXD');
  if (await ssoBtn.isVisible()) {
      await ssoBtn.click();
      await page.waitForTimeout(2000);
  }

  // Now on Keycloak page
  const tabBtn = page.getByText('Tài khoản cấp bởi hệ thống');
  if (await tabBtn.isVisible()) {
      await tabBtn.click();
  }
  
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('wrongpassword123');
  await page.locator('button:has-text("Đăng nhập"), input[type="submit"][value="Đăng nhập"]').first().click();
  await page.waitForTimeout(3000);
  
  const content = await page.content();
  fs.writeFileSync('error_page.html', content);
  await browser.close();
})();
