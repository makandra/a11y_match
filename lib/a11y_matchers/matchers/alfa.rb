require_relative "./error_message_constructor"
require 'benchmark'

module A11yMatchers
  module Matchers
    class Alfa
      include ErrorMessageConstructor

      def initialize() end

      def matches?(page)
        configuration = A11yMatchers.configuration

        arguments = {
          included_rules: configuration.alfa.included_rules,
          excluded_rules: configuration.alfa.excluded_rules
        }
        time = Benchmark.measure do
          Capybara.using_wait_time(configuration.audit_wait_time) do
            @result = page.evaluate_async_script <<-JS, arguments
                [auditOptions, done] = arguments
                window.alfa.startAudit(auditOptions)
                    .then(done)
                    .catch(error => done({error: true, message: error.message, stacktrace: error.stack}))
            JS
          end
        end
        A11yMatchers.time_logger.add(Logger::ERROR, "#{page.current_path},#{time.real.to_s}", "alfa")
        @errors = @result['errors']
        @warnings = @result['warnings']
        log_message(
          "Alfa",
          page.current_path,
          configuration.on_violation == :log ? @errors : [],
          configuration.on_warning == :log ? @warnings : [],
        )
        configuration.on_violation == :fail && !@errors.empty? || configuration.on_warning == :fail && @warnings.empty?
      end

      def failure_message
        "Alfa did not find any Accessibility issues but expected to find some"
      end

      def failure_message_when_negated
        construct_message("Alfa", @errors, A11yMatchers.configuration.on_warning == :fail ? @warnings : [])
      end

      def description
        "check ..."
      end
    end
  end
end
