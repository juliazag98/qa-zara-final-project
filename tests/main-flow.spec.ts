import { test, expect } from "./fixtures/base.fixture";
import { HomePage } from "./pages/HomePage";
import { SearchComponent } from "./pages/SearchComponent";
import { SearchResultPage } from "./pages/SearchResultPage";
import { ProductPage } from "./pages/ProductPage";
import { AuthPage } from "./pages/AuthPage";
import { invalidEmails } from "./data/invalidEmails";

test("search and add to cart product", async ({
  page,
  acceptCookiesAndOpen,
}) => {
  const languagePage = new HomePage(page);
  await languagePage.goToUa();
  await languagePage.expectHomeLoaded();

  const searchPage = new SearchComponent(page);
  await searchPage.openSearch();
  await searchPage.search("біла майка");

  const searchResultPage = new SearchResultPage(page);
  await searchResultPage.waitForResults();
  await searchResultPage.openFirstProduct();

  const productPage = new ProductPage(page);
  await productPage.addAllAvailableSizesToCart();

  await productPage.openCart();
  await productPage.expectCartPageOpened();

  const auth = new AuthPage(page);
  await auth.openFromCart();
  await auth.expectAuthPageVisible();

  const emailInput = page.getByRole("textbox", { name: /адреса ел\. пошти/i });
  const continueBtn = page.getByRole("button", { name: /продовжити/i });
  const errorText = page.getByText(/Недійсна адреса електронної пошти/i);

  for (const email of invalidEmails) {
    await test.step(`invalid email: ${email}`, async () => {
      await emailInput.fill(email);
      await continueBtn.click();
      await expect(errorText).toBeVisible();
      await emailInput.fill(""); // очищаємо для наступного кейса
    });
  }
});
