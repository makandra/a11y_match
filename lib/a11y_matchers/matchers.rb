module A11yMatchers
  module Matchers
    class Alfa
      def initialize()
      end

      def matches?(page)
        res = page.evaluate_script <<-JS
          await window.alfa.startRubyAudit()
        JS

        @errors = res['failures']
        @warnings = res['warnings']
        debugger
        !res['passed']
      end

      def failure_message
          "expected ... to ... , but it ..."
      end

      def failure_message_when_negated
          "expected ... to not ..., but it ..."
      end

      def description
        "check ..."
      end
    end

    class Kayle
      def initialize()
      end

      def matches?(page)
        res = page.evaluate_script <<-JS
          await window.kayle.startAudit()
        JS

        if res['error']
          @errors = [res['error']]
          @warnings = []
        else
          @errors = res['messages']['failures']
          @warnings = res['messages']['warnings']
        end
        !res['passed']
      end

      def failure_message
        "expected ... to ... , but it ..."
      end

      def failure_message_when_negated
        "expected ... to not ..., but it ..."
      end

      def description
        "check ..."
      end
    end

    def have_kayle_issues(*args)
      Kayle.new
    end
    def have_alfa_issues(*args)
      Alfa.new
    end
  end
end

