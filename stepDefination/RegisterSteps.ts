import { Given, When, Then } from "@cucumber/cucumber";
import { Anmelden } from "./modules/Anmelden";
import { Configs } from "../Config/Configs";

let anmeldon: Anmelden = new Anmelden();

Given('User navigates to PayBack home page', async function () {
    await anmeldon.navigate(Configs.URL);
    await anmeldon.acceptCookies();
});

When('User selects A PayBack Card', async function () {
    await anmeldon.selectaPBCard();
});

When('User enters all the details', async function () {
    await anmeldon.enterDetails();
});

Then('Perform all validations on personal details', async function () {
    await anmeldon.performFieldValidations();
    console.log("Validation completed successfully...")
});

