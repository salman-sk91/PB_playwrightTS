import { After, Before, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import playwright from 'playwright';
import { Configs } from "../../Config/Configs";
import { LoadTestDataForScenario } from "./LoadTestDataForScenario";

setDefaultTimeout( 30 * 1000);

BeforeAll(async()=>{
    
    console.log("In Before All");
    global.browser = await playwright.chromium.launch({headless:Configs.headless,channel:"chrome"});
    console.log("Chrome browser launched...");
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
    let loadTestData: LoadTestDataForScenario = new LoadTestDataForScenario();
    console.log("In Before ");
    console.log("Scenarios name:: "+scenario.pickle.name);
    let name = scenario.pickle.name;
    let testCaseNumber  = name.split("::");
    console.log(testCaseNumber[1]);
    await loadTestData.name(testCaseNumber[1]);


});

After(async(scenario)=>{
    console.log("In After ");
    console.log("Scenario :: "+scenario.pickle.name+" :: Status => "+scenario.result?.status);       
});
