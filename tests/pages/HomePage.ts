import { expect, type Page, type Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly languageSelect: Locator;
  readonly continueButton: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.languageSelect = page.getByLabel("Language");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.menuButton = page.getByRole("button", { name: "Відкрити меню" });
  }

  async goToUa(): Promise<void> {
    if (await this.languageSelect.isVisible().catch(() => false)) {
      await this.languageSelect.selectOption("uk");
      await this.continueButton.click();
    } else {
      await this.page.goto("/ua/uk/");
    }

    await expect(this.page).toHaveURL(/\/ua\//);
  }

  
  async expectHomeLoaded(): Promise<void> {
    await expect(this.menuButton).toBeVisible({ timeout: 15000 });
  }
    
}
