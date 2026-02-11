import { expect, type Page, type Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly sizeButtons: Locator;
  readonly closeButton: Locator;
  readonly noThanksButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addButton = page
      .locator("button:visible", { hasText: /^Додати/i })
      .first();

    this.sizeButtons = page
      .getByRole("button")
      .filter({ hasText: /^(XXS|XS|S|M|L|XL|XXL|\d{2})$/ });

    this.closeButton = page.getByRole("button", { name: "Закрити" });
    this.noThanksButton = page.getByRole("button", { name: "Ні, дякую" });
  }

  private async closeOverlays() {
    await this.page.mouse.click(10, 10);

    if (await this.noThanksButton.isVisible().catch(() => false)) {
      await this.noThanksButton.click();
      return;
    }

    if (await this.closeButton.isVisible().catch(() => false)) {
      await this.closeButton.click();
    }
  }

  async addAllAvailableSizesToCart(): Promise<number> {
    // await this.addButton.waitFor({ state: "visible", timeout: 3000 });
    await this.addButton.click();

    const availableSizes: string[] = [];
    const count = await this.sizeButtons.count();

    for (let i = 0; i < count; i++) {
      const btn = this.sizeButtons.nth(i);
      if (await btn.isDisabled().catch(() => false)) continue;

      const text = (await btn.textContent())?.trim();
      if (text) availableSizes.push(text);
    }

    for (const size of availableSizes) {
      const sizeBtn = this.page.getByRole("button", {
        name: size,
        exact: true,
      });

      //await sizeBtn.waitFor({ state: "visible", timeout: 300 });
      await sizeBtn.click();

      await this.closeOverlays();

      // await this.addButton.waitFor({ state: "visible", timeout: 1000 });
      await this.addButton.click();
    }

    return availableSizes.length;
  }

  async openCart() {
    await this.page
      .getByRole("link", { name: /Товари в кошику:.*Перейти в кошик/ })
      .click();
  }

  async expectCartPageOpened() {
    await expect(this.page).toHaveURL(/\/ua\/uk\/shop\/cart/);
  }
}
