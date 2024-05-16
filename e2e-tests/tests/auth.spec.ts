import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"


test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", {name: "Sign in"}).click();

  await expect(page.getByRole("heading", {name: "Welcome back"})).toBeVisible();

  await page.locator("[name=email]").fill("anand@gmail.com");
  await page.locator("[name=password]").fill("anand287");

  await page.getByRole("button", {name: "Sign in"}).click();

  await expect(page.getByText("Sign in successfull")).toBeVisible();

  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();  

});




test('should allow user to register', async ({ page }) => {
  const testUser = `test_user_${Math.ceil(Math.random()*1000) + 287}`;
  const testEmail = `${testUser}@gmail.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign in"}).click();

  await page.getByRole("link", {name: "Register here"}).click();

  await expect(page.getByRole("heading", {name: "Create an account"})).toBeVisible();

  await page.locator("[name=firstName]").fill(testUser);
  await page.locator("[name=lastName]").fill("test");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("anand287");
  await page.locator("[name=confirmPassword]").fill("anand287");

  await page.getByRole("button", {name: "Create account"}).click();

  await expect(page.getByText("Registration successfull")).toBeVisible();

  await expect(page.getByRole("link", {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole("link", {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole("button", {name: 'Sign Out'})).toBeVisible();
});
