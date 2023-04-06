Feature: Validating Punk API response for Beverages
  As a user
  I want to initiate requests to the Punk API
  So that I can validate response for beer types

  Scenario Outline: Validating the Punk API for Beer <BeerId> with success <ResponseCode> response
    Given I call the punk api with beer id "<BeerId>"
    Then I expect a <ResponseCode> status response
    And The malt is "<MaltName>"
    And The malt value is <MaltValue> and the unit is "<Unit>"

    Examples:
      | BeerId | ResponseCode | MaltName   | MaltValue | Unit      |
      | 192    | 200          | Extra Pale | 5.3       | kilograms |
      | 100    | 200          | Extra Pale | 4.5       | kilograms |
      | 300    | 200          | Pale Ale   | 3.12      | kilograms |
      | 140    | 200          | Extra Pale | 5.88      | kilograms |