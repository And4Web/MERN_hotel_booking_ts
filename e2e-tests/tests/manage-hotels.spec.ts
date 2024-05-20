import {test, expect} from '@playwright/test';
import path from 'path';

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

test("should allow a user to add a new hotel", async ({page})=>{
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name=name]").fill("Test hotel");
  await page.locator("[name=city]").fill("Test hotel city");
  await page.locator("[name=country]").fill("Test hotel country");
  await page.locator("[name=description]").fill("Test hotel description");
  await page.locator("[name=adultCount]").fill("4");
  await page.locator("[name=childCount]").fill("2"); 
  await page.locator("[name=pricePerNight]").fill("1799");

  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  await page.selectOption('select[name="starRating"]', "4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
    path.join(__dirname, "files", "3.webp"),
    
  ])

  await page.getByRole("button", {name: "Save Hotel"}).click()

  await expect(page.getByText("Hotel saved")).toBeVisible();
})

