require_relative "./error_message"

module A11yMatchers
  module Matchers
    class Qualweb
      include ErrorMessage
      def initialize()
      end

      def matches?(page)
        @result = Capybara.current_session.evaluate_script <<-JS
          await window.qualweb.startAudit()
        JS
        # if res['error']
        #   @errors = [res['error']]
        #   @warnings = []
        # else
        #   @errors = res['messages']['failures']
        #   @warnings = res['messages']['warnings']
        # end
        @errors = @result['errors']
        @warnings = @result['warnings']
        !@result['passed']
      end

      def failure_message
        "QualWeb did not find any Accessibility issues but expected to find some"
      end

      def failure_message_when_negated
        construct_message("QualWeb", @result)
      end

      def description
        "check ..."
      end
    end
  end
end
