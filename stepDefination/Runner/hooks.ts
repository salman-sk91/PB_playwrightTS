import { After, Before, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import playwright from 'playwright';
import { Configs } from "../../Config/Configs";

setDefaultTimeout( 30 * 1000);

BeforeAll(async()=>{
    
    console.log("In Before All");
    global.browser = await playwright.chromium.launch({headless:Configs.headless,channel:"chrome"});
    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();     
   
});

AfterAll(async()=>{
    console.log("In After All");
    await global.page.close();
    await global.context.close();
    await global.browser.close();     
});

Before(async (scenario)=>{
    console.log("In Before ");
    console.log("Scenarios name:: "+scenario.pickle.name);
});

After(async(scenario)=>{
    console.log("In After ");
    console.log("Scenario :: "+scenario.pickle.name+" :: Status => "+scenario.result?.status);       
});
