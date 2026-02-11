import { expect, type Page, type Locator } from "@playwright/test";

export class AuthPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly invalidEmailError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByText("УВІЙДІТЬ У СИСТЕМУ АБО ЗАРЕЄСТРУЙТЕСЬ");
    this.emailInput = page.getByRole("textbox", { name: /адреса ел\. пошти/i });
    this.continueButton = page.getByRole("button", { name: "ПРОДОВЖИТИ" });
    this.invalidEmailError = page.getByText("Недійсна адреса електронної пошти");
  }

  async openFromCart() {
    await this.page.getByRole("button", { name: "ПРОДОВЖИТИ" }).click();
  }

  async expectAuthPageVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
  }

  async submitInvalidEmail(email: string) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await expect(this.invalidEmailError).toBeVisible();
  }
}
