import { test, expect } from '@playwright/test';

test('Логин в кабинет специалиста', async ({ page }) => {
  await page.goto('https://me-dev.ezostream.com/');
  const email = 'fortunet.qa+3@gmail.com'
  const pass = 'Pass1234$'

  await expect(page.getByText('Войдите в свой аккаунт')).toBeVisible();

   await page.locator('input[name="email"]').fill(email)

   await page.locator('input[name="password"]').fill(pass)

   await page.locator('button[type="submit"]').click()

  await page.waitForTimeout(3000); // ждем 3 секунды


  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();



});
