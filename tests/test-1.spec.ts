import { test, expect, Page, Locator } from '@playwright/test';

interface Element {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Element[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API', exact: true }),
    name: 'API',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Command+K)' }),
    name: 'Search (Command+K)',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Playwright enables reliable',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get started button',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка елементов навигации в хедере', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названий елементов навигации в хедере', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия елемента ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Тест правильности ссылки', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка правильности ссылки элемента ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('Проверка правильности заголовка страницы', async ({ page }) => {
    for (const { locator, name, text } of elements) {
      if (name === 'Playwright enables reliable' && text) {
        await expect.soft(locator(page)).toBeVisible();
        await expect.soft(locator(page)).toContainText(text);
      }
    }
  });

  test('Проверка корректной работы кнопки Get Started', async ({ page }) => {
    for (const { locator, name, text, attribute } of elements) {
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
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system');
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  ['light', 'dark'].forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
