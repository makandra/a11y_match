require_relative "./error_message_constructor"

module A11yMatchers
  module Matchers
    class Axe
      include ErrorMessageConstructor
      def initialize() end

      def matches?(page)
        configuration = A11yMatchers.configuration
        arguments = {
          included_rules: configuration.axe.included_rules,
          excluded_rules: configuration.axe.excluded_rules,
        }
        time = Benchmark.measure do
          Capybara.using_wait_time(configuration.audit_wait_time) do
            @result = page.evaluate_async_script <<-JS, arguments
                [auditOptions, done] = arguments
                window.axe.startAudit(auditOptions)
                  .then(result => {done(result)})
                  .catch(error => {done({error_raised: true, message: error.message, stacktrace: error.stack})})
            JS
          end
        end
        A11yMatchers.time_logger.add(Logger::ERROR, "#{page.current_path},#{time.real.to_s}", "axe")

        @errors = @result['errors']
        @warnings = @result['warnings']
        log_message(
          "Axe",
          page.current_path,
          configuration.on_violation == :log ? @errors : [],
          configuration.on_warning == :log ? @warnings : [],
        )
        configuration.on_violation == :fail && @errors.present? || configuration.on_warning == :fail && @warnings.present?
      end

      def failure_message
        "Axe did not find any Accessibility issues but expected to find some"
      end

      def failure_message_when_negated
        construct_message("Axe", @errors, A11yMatchers.configuration.on_warning == :fail ? @warnings : [])
      end

      def description
        "check ..."
      end
    end
  end
end
