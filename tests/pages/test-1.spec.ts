import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Проверка елементов навигации в хедере', async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.checkElementsVisability();
  });

  test('Проверка названий елементов навигации в хедере', async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.checkElementsText();
  });

  test('Тест правильности ссылки', async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.checkElementsAttributes();
  });

  test('Проверка правильности заголовка страницы', async ({ page }) => {
    const mainPage = new MainPage(page);
    for (const { locator, name, text } of mainPage.elements) {
      if (name === 'Playwright enables reliable' && text) {
        await expect.soft(locator(page)).toBeVisible();
        await expect.soft(locator(page)).toContainText(text);
      }
    }
  });

  test('Проверка корректной работы кнопки Get Started', async ({ page }) => {
    const mainPage = new MainPage(page);
    for (const { locator, name, text, attribute } of mainPage.elements) {
      if (name === 'Get started button' && text && attribute) {
        await expect.soft(locator(page)).toBeVisible();
        await expect.soft(locator(page)).toHaveText(text);
        await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        await locator(page).click();
        await expect(page).toHaveURL('https://playwright.dev/docs/intro');
      }
    }
  });

  test('Проверка переключение цветового мода страницы', async ({ page }) => {
    mainPage = new MainPage(page);
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system');
    await mainPage.clickSwitchModeButton();
    await mainPage.checkDataThemeLight();
    await mainPage.clickSwitchModeButton();
    await mainPage.checkDataThemeDark();
  });

  test(`Проверка стилей активного Light мода`, async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.setLightMode();
    await mainPage.checkLayoutWithLightMode();
  });

  test(`Проверка стилей активного Dark мода`, async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
