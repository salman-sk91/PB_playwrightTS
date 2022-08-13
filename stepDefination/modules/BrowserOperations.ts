import { Page } from "playwright";


export class BrowserOperations {
    
    public static async pw_Click(page: Page,locator) {
        if (await page.locator(locator).isEnabled()) {
            await page.locator(locator).click();
            console.log("Clicked On : "+ locator);
        } else {
            console.log("Element is not Enabled for Click Operation");
        }
    }

    public static async pw_navigateTo(page: Page , url) {
       await page.goto(url);
    }

    public static async pw_IsVisible(page: Page, locator): Promise<boolean> {
        return await page.locator(locator).isVisible();
    }


}