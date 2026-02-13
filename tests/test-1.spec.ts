import { test, expect } from '@playwright/test';

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка елементов навигации в хедере', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API', exact: true })).toBeVisible();
    await expect(page.getByText('Node.jsNode.jsPythonJava.NET')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search (Command+K)' })).toBeVisible();
  });

  test('Проверка названий елементов навигации в хедере', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect(page.getByRole('link', { name: 'API', exact: true })).toContainText('API');
    await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
    await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
  });

  test('Тест правильности ссылки', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
    await expect(page.getByRole('link', { name: 'API', exact: true })).toHaveAttribute(
      'href',
      '/docs/api/class-playwright',
    );
    await expect(page.getByRole('button', { name: 'Node.js' })).toHaveAttribute('href', '#');
    await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/community/welcome',
    );
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
      'href',
      'https://github.com/microsoft/playwright',
    );
    await expect(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute(
      'href',
      'https://aka.ms/playwright/discord',
    );

    await expect(
      page.getByRole('button', { name: 'Switch between dark and light' }),
    ).toHaveAttribute('title', 'system mode');
  });

  test('Проверка переключение цветового мода страницы', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system');
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка правильности заголовка страницы', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable end-to-end testing for modern web apps.',
    );
  });

  test('Проверка корректной работы кнопки Get Started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
    await page.getByRole('link', { name: 'Get started' }).click();
  });
});
