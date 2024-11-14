require_relative "./error_message"

module A11yMatchers
  module Matchers
    class Kayle
      include ErrorMessage
      def initialize()
      end

      def matches?(page)
        @result = Capybara.current_session.evaluate_async_script <<-JS
          window.kayle.startAudit().then(result => arguments[0](result))
        JS

        @errors = @result['errors']
        @warnings = @result['warnings']
        !@result['passed']
      end

      def failure_message
        "Kayle did not find any Accessibility issues but expected to find some"
      end

      def failure_message_when_negated
        construct_message("Kayle", @result)
      end

      def description
        "check ..."
      end
    end
  end
end
