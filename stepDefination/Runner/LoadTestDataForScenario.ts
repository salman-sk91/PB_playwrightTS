
export class LoadTestDataForScenario {

   async name(testcasenumber:string) {

    if(testcasenumber.includes("1001")){
        await console.log("Test Data Loaded for Testcase: "+testcasenumber);
    } 
    if(testcasenumber.includes("1002")){
        await console.log("Test Data Loaded for Testcase second: "+testcasenumber);
    }
    
   }

}