@chrome @en.m.wikipedia.beta.wmflabs.org @firefox @login @test2.m.wikipedia.org
Feature: Special:Uploads tutorial

  Scenario: Link to tutorial for new user
    Given I am using the mobile site
      And I am logged in as a new user
    When I go to uploads page
    Then the upload button links to the tutorial
