require_relative "./error_message"

module A11yMatchers
  module Matchers
    class Alfa
      include ErrorMessage
      def initialize()
      end

      def matches?(page)
        @result = Capybara.current_session.evaluate_async_script <<-JS
          window.alfa.startAudit().then(result => arguments[0](result))
        JS

        @errors = @result['errors']
        @warnings = @result['warnings']
        !@result['passed']
      end

      def failure_message
        "Alfa did not find any Accessibility issues but expected to find some"
      end

      def failure_message_when_negated
        construct_message("Alfa", @result)
      end

      def description
        "check ..."
      end
    end
  end
end
