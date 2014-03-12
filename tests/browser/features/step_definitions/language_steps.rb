When /^I click the language button$/ do
  on(ArticlePage).language_button_element.when_present.click
end

Then(/^I see the language overlay$/) do
  on(ArticlePage).overlay_element.when_present.class_name.should match "language-overlay"
end

When(/^I click the language overlay close button$/) do
  on(ArticlePage).overlay_close_button_element.click
end

Then(/^I don't see the languages overlay$/) do
  on(ArticlePage).overlay_element.should_not be_visible
end
