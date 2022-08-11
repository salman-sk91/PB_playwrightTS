# PB_PlaywrightTS

A simple nodejs based PayBack UI Automation using TypeScript + Playwright that verifies functionality of Anmelden flow

****************************************************************************
Flow automated as part of the project are as follows -

Use any of the mentioned frameworks to automate the following scenario on www.payback.at:
* Go to “Anmelden”
* Select “Noch keine PAYBACK Karte? Neue Karte auswählen.“
* Select a PAYBACK card of your choice
* Enter some Email and pin and click on “Weiter”
* Enter some personal data (only the mandatory fields)
* Please do some assertions on the field validation

****************************************************************************
Tools/Technologies used are as follows - 

* Playwright
* TypeScript
* CucumberJS
* Chai 
* Nodejs

****************************************************************************
How the Framework works?

Its a BDD Cucumber Framework, all the test scenarios are declared in a Feature file.
The Browser is initialized at the beginning of Feature file execution and destroyed after the completion of Feature file.

Using the Modular approach all Page Object locators/Web Elements is placed in a separate files for easy maintenance. The default execution happens on chrome browser in headless: false
To switch between actual headless and non-headless run, change the parameter headless:boolean = false in Configs.ts file.

****************************************************************************
How to execute the Tests ?

* Clone the repository to your workspace.
* Build the project using npm install
* Execute the script "npm run test"
* Once the execution completes the HTML result will be available at: {project.directory}/Report/output.html
* Once the execution completes the JSON result will be available at: {project.directory}/Report/output.json

****************************************************************************
 Sample Execution Report :
![image](https://user-images.githubusercontent.com/110985162/184205836-6d0e1727-eac9-473a-af45-6ecc9a94fc64.png)

****************************************************************************
Notes:
* Execution using version node js 14 command line will provide the test report in HTML format

****************************************************************************
