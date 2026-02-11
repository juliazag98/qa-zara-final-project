import { expect, type Page, type Locator } from "@playwright/test";

export class LanguagePage {
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

  selectLanguage = async (value: string) => {
    await this.languageSelect.selectOption(value);
  };

  clickContinue = async () => {
    await this.continueButton.click();
  };

  goToUaByLanguage = async () => {
    await this.selectLanguage("uk");
    await this.clickContinue();
    await expect(this.page).toHaveURL(/\/ua\/?$/);
  };

  expectHomeLinkVisible = async () => {
    await expect(this.menuButton).toBeVisible();
  };


}
