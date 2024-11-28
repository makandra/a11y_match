require "rspec/expectations"
require "rspec/matchers"
require "rspec/core"
require_relative "./matchers/alfa"
require_relative "./matchers/axe"
require_relative "./matchers/qualweb"
require_relative "./matchers/kayle"

module A11yMatchers
  module Matchers
    def have_alfa_issues(*args)
      Alfa.new
    end

    def have_axe_issues(*args)
      Axe.new
    end

    def have_kayle_issues(*args)
      Kayle.new
    end

    def have_qualweb_issues(*args)
      Qualweb.new
    end

    RSpec::Matchers.define :have_a11y_issues do
      match do |page|
        begin
          aggregate_failures "a11y issues" do
            if A11yMatchers.configuration.alfa.enabled then expect(page).to have_alfa_issues else end
            if A11yMatchers.configuration.axe.enabled then expect(page).to have_axe_issues else end
            if A11yMatchers.configuration.kayle.enabled then expect(page).to have_kayle_issues else end
            if A11yMatchers.configuration.qualweb.enabled then expect(page).to have_qualweb_issues else end
          end
        rescue RSpec:: Expectations::ExpectationNotMetError,
          RSpec::Expectations::MultipleExpectationsNotMetError => error
          @error = error
          raise error
        end
      end

      match_when_negated do |page|
        begin
          aggregate_failures "a11y issues" do
            if A11yMatchers.configuration.alfa.enabled then expect(page).not_to have_alfa_issues else end
            if A11yMatchers.configuration.axe.enabled then expect(page).not_to have_axe_issues else end
            if A11yMatchers.configuration.kayle.enabled then expect(page).not_to have_kayle_issues else end
            if A11yMatchers.configuration.qualweb.enabled then expect(page).not_to have_qualweb_issues else end
          end
        rescue RSpec:: Expectations::ExpectationNotMetError,
          RSpec::Expectations::MultipleExpectationsNotMetError => error
          @error = error
          raise error
        end
      end
      failure_message do
        @error.message
      end
      failure_message_when_negated do
        @error.message
      end
    end
  end
end
