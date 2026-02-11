# Zara Playwright Final Project (E2E)

Автоматизований E2E тест на Playwright для сайту https://www.zara.com.

## Covered scenario (project requirements)

1. Користувач обробляє модальне вікно з cookie.
2. Через пошук знаходить продукт і додає всі доступні розміри в кошик.
3. Переходить до оформлення та відкриває сторінку входу/реєстрації.
4. Вводить некоректні дані (email) і перевіряє повідомлення про помилку.

## Tech stack

- Playwright Test
- TypeScript
- Page Object Model (POM)

## Project structure

tests/
data/
invalidEmails.ts
fixtures/
base.fixture.ts
pages/
HomePage.ts
SearchComponent.ts
SearchResultPage.ts
ProductPage.ts
AuthPage.ts
main-flow.spec.ts


 Test data
Невалідні email-значення винесені в окремий файл:

tests/data/invalidEmails.ts
