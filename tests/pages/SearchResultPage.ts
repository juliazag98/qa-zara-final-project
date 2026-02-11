import { expect, type Page, type Locator } from "@playwright/test";

export class SearchResultPage {
  readonly page: Page;
  readonly firstProductImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProductImage = page
      .locator('img[data-qa-qualifier="media-image"]')
      .first();
  }

  async waitForResults(): Promise<void> {
    await expect(this.firstProductImage).toBeVisible({ timeout: 15000 });
  }

  async openFirstProduct(): Promise<void> {
    await this.firstProductImage.scrollIntoViewIfNeeded();
    await this.firstProductImage.click();
  }
}
