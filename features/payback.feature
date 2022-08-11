@payback
Feature: Payback Anmelden automation

    Scenario: PayBack Registration Personal Details Validation

        Given User navigates to PayBack home page        
        When User selects A PayBack Card
        And User enters all the details
        Then Perform all validations on personal details

    Scenario: PayBack Registration without Validation

        Given User navigates to PayBack home page        
        When User selects A PayBack Card
        And User enters all the details 