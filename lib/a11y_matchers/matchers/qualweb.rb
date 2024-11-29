require_relative "./error_message_constructor"
require 'benchmark'

module A11yMatchers
  module Matchers
    class Qualweb
      include ErrorMessageConstructor

      def initialize() end

      def matches?(page)
        configuration = A11yMatchers.configuration
        arguments = {
          excluded_rules: configuration.qualweb.excluded_rules,
          included_rules: configuration.qualweb.included_rules,
        }

        time = Benchmark.measure do
          Capybara.using_wait_time(configuration.audit_wait_time) do
            @result = page.evaluate_async_script <<-JS, arguments
              [auditOptions, done] = arguments
              window.qualweb.startAudit(auditOptions)
                .then(result => done(result))
                .catch(error => done({error: error, message: error.message, stacktrace: error.stack}))
            JS
          end
        end
        A11yMatchers.time_logger.add(Logger::ERROR, "#{page.current_path},#{time.real.to_s}", "qualweb")

        @errors = @result['errors']
        @warnings = @result['warnings']

        log_message(
          "QualWeb",
          page.current_path,
          configuration.on_violation == :log ? @errors : [],
          configuration.on_warning == :log ? @warnings : [],
        )

        configuration.on_violation == :fail && !@errors.empty? || configuration.on_warning == :fail && @warnings.empty?
      end

      def failure_message
        "QualWeb did not find any Accessibility issues but expected to find some"
      end

      def failure_message_when_negated
        construct_message("QualWeb", @errors, A11yMatchers.configuration.on_warning == :fail ? @warnings : [])
      end

      def description
        "check ..."
      end
    end
  end
end
