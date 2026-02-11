import { test as base, expect } from "@playwright/test";

type ZaraFixtures = {
  acceptCookiesAndOpen: void;
};

export const test = base.extend<ZaraFixtures>({
  acceptCookiesAndOpen: 
    async ({ page }, use) => {
      await page.goto("/");

      const acceptCookies = page.getByRole("button", {
        name: /accept all cookies/i,
      });

      if (await acceptCookies.isVisible().catch(() => false)) {
        await acceptCookies.click();
      }

      await use();
    }  ,
});

export { expect };
