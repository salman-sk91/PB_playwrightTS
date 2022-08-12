import { InterfacePageValidation } from "./InterfacePageValidation";

const Assert = require("chai").assert;

export class HomePage implements InterfacePageValidation {

    //Page Locators
    accepCookieBtn = "id=onetrust-accept-btn-handler";
    anmeldenLink = "text=Anmelden";
    homePageTitle = "Jetzt bei PAYBACK Österreich anmelden";

    async verifySuccessful_Navigation() {
        let title: String = await global.page.locator("title").innerText();
        Assert.equal(title, this.homePageTitle);
    }

    async navigate(url: String) {
        await global.page.goto(url);
        console.log("Navigated to PB home page");
    }

    async acceptCookies() {
        let accept = await global.page.locator(this.accepCookieBtn).isVisible();
        if (accept) {
            await global.page.locator(this.accepCookieBtn).click();
            console.log("Cookie Accepted")
        } else {
            console.log("Cookie Already Accepted")
        }
    }

    async clickAnmeldenLink() {
        await global.page.locator(this.anmeldenLink).first().dispatchEvent("click");
        console.log("Clicked on Anmelden");
    }


}