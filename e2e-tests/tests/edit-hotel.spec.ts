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

test("Should Edit the Hotel", async({page})=>{
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole('link', {name: "View Details"}).click();

  await page.waitForSelector('[name="name"]', {state: "attached"});
  await expect(page.locator('[name="name"]')).toHaveValue("premium hotel");
  await page.locator('[name="name"]').fill('premium hotel updated');
  await page.getByRole('button', {name: "Save Hotel"}).click(); 
  
  await expect(page.getByText("Updated Hotel.")).toBeVisible();

  await page.reload();
  
  await expect(page.locator('[name="name"]')).toHaveValue("premium hotel updated")

  await page.locator('[name="name"]').fill('premium hotel');
  await page.getByRole('button', {name: "Save Hotel"}).click();
  await expect(page.getByText("Updated Hotel.")).toBeVisible();
})