
const Assert = require("chai").assert;

export class Anmelden {

    async navigate(url: String) {
        await global.page.goto(url);
        console.log("Navigated to PB home page");
    }

    async acceptCookies() {
        let accept = await global.page.locator("id=onetrust-accept-btn-handler").isVisible();
        if (accept) {
            await global.page.locator("id=onetrust-accept-btn-handler").click();
        } else {
            console.log("Element not visible")
        }
    }

    async selectaPBCard() {
        await global.page.locator("text=Anmelden").first().dispatchEvent("click");
        console.log("Clicked on Anmelden");
        await global.page.locator("(//label[@class='pb-radio__label'])[2]").click();        
        await global.page.locator("//div[contains(@class,'swiper-slide-active')]//img[@alt='BP']").click();
        await global.page.locator("(//span[@class='pb-sign-up__button-text'])[1]").click();
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
        await global.page.locator("//body").click();
        let zipcode_errorText = await global.page.locator(".pb-form-field__error-msg").first().innerText();        
        Assert.equal(zipcode_errorText,'Bitte geben Sie Ihre PLZ ein');        
        await global.page.locator("id=city").type("");
        await global.page.locator("//body").click();
        let city_errorText = await global.page.locator(".pb-form-field__error-msg").last().innerText();
        Assert.equal(city_errorText,'Bitte geben Sie Ihren Wohnort an');  

    }

}

