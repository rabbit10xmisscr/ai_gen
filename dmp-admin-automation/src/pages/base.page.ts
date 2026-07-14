import { Page, Locator, expect } from '@playwright/test';
import { logger } from '@/utils/logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async clickElement(locator: Locator, description: string) {
    logger.info(`Clicking on ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async typeText(locator: Locator, text: string, description: string) {
    logger.info(`Typing "${text}" into ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async getText(locator: Locator, description: string): Promise<string> {
    logger.info(`Getting text from ${description}`);
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() || '';
  }

  async verifyElementVisible(locator: Locator, description: string) {
    logger.info(`Verifying ${description} is visible`);
    await expect(locator).toBeVisible();
  }
}
