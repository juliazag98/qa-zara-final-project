import { expect, type Page, type Locator } from "@playwright/test";

export class SearchComponent {
  readonly page: Page;
  readonly searchLink: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchLink = page.getByRole("link", { name: "Пошук" });
    this.searchBox = page.getByRole("searchbox", {
      name: "Введення тексту для пошуку",
    });
  }

 // async openSearch() {
 //   await this.searchLink.click();
 //   await expect(this.searchBox).toBeVisible({timeout: 3000});
 // }

  async search(query: string) {
  const encoded = encodeURIComponent(query);
  await this.page.goto(`/ua/uk/search?searchTerm=${encoded}&section=WOMAN`);
  await expect(
  this.page.locator('img[data-qa-qualifier="media-image"]').first()
).toBeVisible({ timeout: 15000 });

}
  }