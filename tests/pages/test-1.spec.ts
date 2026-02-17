import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

test.describe('Тесты главной страницы', () => {
  test('Проверка елементов навигации в хедере', async ({ mainPage }) => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названий елементов навигации в хедере', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Тест правильности ссылки', async ({ mainPage }) => {
    await mainPage.checkElementsAttributes();
  });

  // test('Проверка правильности заголовка страницы', async ({ mainPage }) => {
  //   for (const { locator, name, text } of mainPage.elements) {
  //     if (name === 'Playwright enables reliable' && text) {
  //       await expect.soft(locator(page)).toBeVisible();
  //       await expect.soft(locator(page)).toContainText(text);
  //     }
  //   }
  // });

  // test('Проверка корректной работы кнопки Get Started', async ({ mainPage }) => {
  //   for (const { locator, name, text, attribute } of mainPage.elements) {
  //     if (name === 'Get started button' && text && attribute) {
  //       await expect.soft(locator(page)).toBeVisible();
  //       await expect.soft(locator(page)).toHaveText(text);
  //       await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value);
  //       await locator(page).click();
  //       await expect(page).toHaveURL('https://playwright.dev/docs/intro');
  //     }
  //   }
  // });

  // test('Проверка переключение цветового мода страницы', async ({ mainPage }) => {
  //   await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system');
  //   await mainPage.clickSwitchModeButton();
  //   await mainPage.checkDataThemeLight();
  //   await mainPage.clickSwitchModeButton();
  //   await mainPage.checkDataThemeDark();
  // });

  test(`Проверка стилей активного Light мода`, async ({ mainPage }) => {
    await mainPage.setLightMode();
    await mainPage.checkLayoutWithLightMode();
  });

  test(`Проверка стилей активного Dark мода`, async ({ mainPage }) => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
