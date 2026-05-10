Feature: VAT calculator on Calkoo
  As a traveller shopping abroad
  I want to work out net price, tax, and total from what I know on my receipt
  So that I can check the shop charged the right tax

  # Reasoning: Discussed in README, Basic functionality, should be working.
  Scenario: VAT rate is correct for the countries
    Given I open the VAT calculator
    Then I check that the VAT rate is correct for the countries

  # Reasoning: Discussed in README, Basic functionality, should be working.
  Scenario Outline: Net price calculates tax and total
    Given I open the VAT calculator
    And I select "<country>" as the country
    And I select <vat_rate> as the VAT rate
    When I enter the net price "<net_price>"
    Then the value-added tax amount should be "<vat_amount>"
    And the gross price should be "<gross_price>"

    Examples:
      | country        | vat_rate | net_price | vat_amount | gross_price |
      | United Kingdom | 20       | 100.00    | 20.00      | 120.00      |

  # Reasoning: Negative number should be rejected.
  @skip
  Scenario: Net is negative number
    Given I open the VAT calculator
    When I enter the net price "<net_price>"
    Then I should see an error message

    Examples:
      | net_price |
      | -100.00   |

  # Reasoning: Non-numeric input should be rejected.
  @skip
  Scenario: Net is not a number
    Given I open the VAT calculator
    When I enter the net price "<net_price>"
    Then I should see an error message

    Examples:
      | net_price |
      | abc       |
      | 123.45abc |
      | ----//    |

  # Reasoning: Advanced options should be visible and switchable between calculation modes, basic functionality, but not critical.
  @skip
  Scenario: Advanced options is visible
    Given I open the VAT calculator
    And I click on the advanced options button
    Then I should see calculation mode options
    And I can switch between calculation modes

  # Reasoning: Discussed in README, Advanced functionality, should be working.
  @skip
  Scenario Outline: Advanced options export CSV
    Given I open the VAT calculator
    And I click on the advanced options button
    Then I select the "Advanced" calculation mode
    And I select <format> as the export format
    And I click on the export button
    Then I should see the exported CSV file

    Examples:
      | format                               |
      | "Auto (recommended)"                   |
      | "International CSV: comma + dot"       |
      | "Excel DE/Europe: semicolon + comma"   |

  # Reasoning: Advanced options should be visible and switchable between calculation modes, basic functionality, but not critical.
  @skip
  Scenario: Advanced options - Adding and removing rows
    Given I open the VAT calculator
    And I click on the advanced options button
    And I select the "Advanced" calculation mode
    And I add a new row
    Then I should see the new row
    And I remove the new row
    Then I should not see the new row

  # Reasoning: Advanced options should be visible and switchable between calculation modes, basic functionality, but not critical.
  @skip
  Scenario: Advanced options - Rounding method
    Given I open the VAT calculator
    And I click on the advanced options button
    And I select the "Advanced" calculation mode
    And I select "<rounding_method>" as the rounding method
    Then I should see the rounding method options
    And I can switch between rounding methods

    Examples:
      | rounding_method   |
      | Per line          |
      | Invoice total     |
      
    