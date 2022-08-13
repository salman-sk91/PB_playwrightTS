import { Given, When, Then } from "@cucumber/cucumber";
import { Configs } from "../Config/Configs";
import { AnmeldenPage } from "./modules/AnmeldenPage";
import { HomePage } from "./modules/HomePage";

let anmeldonPage: AnmeldenPage = new AnmeldenPage();
let homePage: HomePage = new HomePage();

Given('User navigates to PayBack home page', async function () {
    await homePage.navigate(Configs.URL);
    await homePage.acceptCookies();
    await homePage.verifySuccessful_Navigation();
});

When('User selects A PayBack Card', async function () {
    await homePage.clickAnmeldenLink();    
    await anmeldonPage.verifySuccessful_Navigation();
    await anmeldonPage.selectaPBCard();
});

When('User enters all the details', async function () {
    await anmeldonPage.enterDetails();
});

Then('Perform all validations on personal details', async function () {
    await anmeldonPage.performFieldValidations();
    console.log("Validation completed successfully...")
});

