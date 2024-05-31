import {test, expect} from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({page}) => {
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign in"}).click();

  await expect(page.getByRole("heading", {name: "Welcome back"})).toBeVisible();

  await page.locator("[name=email]").fill("anand@gmail.com");
  await page.locator("[name=password]").fill("anand287");

  await page.getByRole("button", {name: "Sign in"}).click();

  await expect(page.getByText("Sign in successfull")).toBeVisible();
})


test('Should show hotel search results', async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("New Delhi");
  await page.getByRole("button", {name: "Search"}).click();

  await expect(page.getByText("hotels found in New Delhi")).toBeVisible();
  await expect(page.getByText("premium hotel")).toBeVisible();
})