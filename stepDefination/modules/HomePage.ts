import { Page } from "playwright";
import { BrowserOperations } from "./BrowserOperations";
import { InterfacePageValidation } from "./InterfacePageValidation";

const Assert = require("chai").assert;

export class HomePage implements InterfacePageValidation {

    //Page Locators
    accepCookieBtn = "id=onetrust-accept-btn-handler";
    anmeldenLink = "//div[text()='Anmelden']";
    homePageTitle = "PAYBACK Österreich: Punkten und belohnen";
    

    async verifySuccessful_Navigation() {
        let title: String = await global.page.locator("title").first().innerText();
        Assert.equal(title, this.homePageTitle);
    }

    async navigate(url: String) {
        await BrowserOperations.pw_navigateTo(global.page, url);
    }

    async acceptCookies() {        
        await BrowserOperations.pw_IsVisible(global.page,this.accepCookieBtn).then(async value =>{
            if (value) {            
                await BrowserOperations.pw_Click(global.page,this.accepCookieBtn)
                console.log("Cookie Accepted")
            } else {
                console.log("Cookie Already Accepted")
            }
        })       
    }

    async clickAnmeldenLink() {        
        await global.page.waitForSelector(this.anmeldenLink);
        await BrowserOperations.pw_Click(global.page,this.anmeldenLink)        
        console.log("Clicked on Anmelden");
    }


}