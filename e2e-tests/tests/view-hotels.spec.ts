import {test, expect, Page} from '@playwright/test';

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


test("should display hotels", async({page})=>{
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("premium hotel")).toBeVisible();
  await expect(page.getByText("Lorem Ipsum is simply dummy text")).toBeVisible();
  await expect(page.getByText("new delhi, India")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("₹ 1599 per night")).toBeVisible();
  await expect(page.getByText("3 adults, 1 children")).toBeVisible();
  await expect(page.getByText("4 Star rating")).toBeVisible();

  await expect(page.getByRole('link', {name: "View Details"})).toBeVisible();
  await expect(page.getByRole('link', {name: "Add Hotel"})).toBeVisible();

})