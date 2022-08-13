import { InterfacePageValidation } from "./InterfacePageValidation";

const Assert = require("chai").assert;

export class AnmeldenPage implements InterfacePageValidation {

    //Page Locators

    accepCookieBtn = "id=onetrust-accept-btn-handler";
    card_selection_radio_btn = "(//label[@class='pb-radio__label'])[2]";
    firstPBCardTile = "(//div[contains(@class,'swiper-slide-active')]//img)[1]";
    WeiterBtn = "(//span[@class='pb-sign-up__button-text'])[1]";
    anmeldenHeaderTxt = "Jetzt mit PAYBACK starten";

    async verifySuccessful_Navigation() {
        let pageHeaderTxt: String = await global.page.locator("h3.pb-headline").first().innerText();
        Assert.equal(pageHeaderTxt, this.anmeldenHeaderTxt);
    }

    async selectaPBCard() {
        await global.page.locator(this.card_selection_radio_btn).click();
        await global.page.locator(this.firstPBCardTile).click();
        await global.page.locator(this.WeiterBtn).click();
        console.log("Selected a PB Card");
    }

    async enterDetails() {
        await global.page.locator("id=email").type("salman@gmail.com");
        await global.page.locator("id=pin").type("1234");
        await global.page.locator("(//span[@class='pb-sign-up__button-text'])[2]").click();
        console.log("Entered Card Details");
    }

    async performFieldValidations() {
        await global.page.locator("select#salutation").selectOption("1");
        await global.page.locator("id=firstName").type("Salman");
        await global.page.locator("id=lastName").type("Shaikh");
        await global.page.locator("//input[@name='birthday']").type("20/01/1991");
        await global.page.locator("id=street").type("Straße123");
        await global.page.locator("id=floor").type("C12");
        await global.page.locator("id=zipCode").type("@32");
        await global.page.locator("body").click();
        let zipcode_errorText = await global.page.locator(".pb-form-field__error-msg").first().innerText();
        Assert.equal(zipcode_errorText, 'Bitte geben Sie Ihre PLZ ein');
        await global.page.locator("id=city").type("");
        await global.page.locator("body").click();
        await global.page.waitForTimeout(500); // Execution happens so fast, hence for Understanding purpose, using playwright wait
        let city_errorText = await global.page.locator(".pb-form-field__error-msg").last().innerText();
        Assert.equal(city_errorText, 'Bitte geben Sie Ihren Wohnort an');
    }

}

