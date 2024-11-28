require_relative "./error_message_constructor"
require 'benchmark'

module A11yMatchers
  module Matchers
    class Kayle
      include ErrorMessageConstructor
      def initialize()
      end

      def matches?(page)
        configuration = A11yMatchers.configuration
        arguments = {
          excluded_rules: configuration.kayle.excluded_rules,
          included_rules: configuration.kayle.included_rules,
        }
        time = Benchmark.measure do
          Capybara.using_wait_time(configuration.audit_wait_time) do
            @result = page.evaluate_async_script <<-JS, arguments
              [auditOptions, done] = arguments
              window.kayle.startAudit(auditOptions)
                .then(result => done(result))
                .catch(error => done({error: error, message: error.message, stacktrace: error.stack}))
            JS
          end
        end
        A11yMatchers.time_logger.add(Logger::ERROR, "#{page.current_path},#{time.real.to_s}", "kayle")

        @errors = @result['errors']
        # I use Capybara's xpath calculation here, so I don't have to do it in JS
        for error in @errors
          error["occurences"] = error["elements"].map { |element| element.path}
        end
        @warnings = @result['warnings']
        log_message(
          "Kayle",
          page.current_path,
          configuration.on_violation == :log ? @errors : [],
          configuration.on_warning == :log ? @warnings : [],
        )
        configuration.on_violation == :fail && @errors.present? || configuration.on_warning == :fail && @warnings.present?
      end

      def failure_message
        "Kayle did not find any Accessibility issues but expected to find some"
      end

      def failure_message_when_negated
        construct_message("Kayle", @errors, A11yMatchers.configuration.on_warning == :fail ? @warnings : [])
      end

      def description
        "check ..."
      end
    end
  end
end
