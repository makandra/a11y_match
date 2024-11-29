require 'logger'
module A11yMatchers
  module Matchers
    module ErrorMessageConstructor
      def describe_outcome(outcome)
        occurences = outcome["occurences"].filter { |occurence| occurence.length > 0 }
        output = "#{outcome["info"]}\n" \
          "   Rule ID: \"#{outcome["ruleId"]}\"\n" \
          "   More info: #{outcome["url"]}\n"
        if occurences.length > 0
          output += "   Occurences:\n" + outcome["occurences"].map { |occurence| " " * 5 + "- #{occurence}" }.join("\n")
        end
        output
      end

      def construct_message(tool, errors, warnings)
        output = "#{tool} found " + construct_error_message(errors)
        if warnings && warnings.length > 0
          output += "\nAnd " + construct_warning_message(warnings)
        end
        output
      end

      def construct_error_message(errors)
        "#{errors.length} #{errors.length == 1 ? "error" : "errors"}:\n" +
          errors.each_with_index.map { |error, index| "#{index + 1}) Error: #{describe_outcome(error)}" }.join("\n\n") +
          "\n"
      end

      def construct_warning_message(warnings)
        "#{warnings.length} #{warnings.length == 1 ? "warning" : "warnings"}:\n" +
          warnings.each_with_index.map { |warning, index| "#{index + 1}) Warning: #{describe_outcome(warning)}" }.join("\n\n") +
          "\n"
      end

      def log_message(tool, url, errors, warnings)
        if errors && errors.length > 0
          A11yMatchers.logger.add(Logger::ERROR, "\n" + construct_error_message(errors), "#{tool.rjust(7, " ")} on \"#{url}\"")
        end
        if warnings && warnings.length > 0
          A11yMatchers.logger.add(Logger::WARN, "\n" + construct_warning_message(warnings), "#{tool.rjust(7, " ")} on \"#{url}\"")
        end
      end
    end
  end
end
