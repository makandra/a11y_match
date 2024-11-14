module A11yMatchers
  module Matchers
    module ErrorMessage
      def describe_outcome(outcome)
        "#{outcome["info"]}\n" \
          "   More info: #{outcome["url"]}\n" \
          "   Occurences:\n" + outcome["occurences"].map { |occurence| " " * 5 + "- #{occurence}" }.join("\n")
      end

      def construct_message(tool, result, warnings_enabled = false) # TODO move this default into the configuration block
        errors = result["errors"]
        warnings = result["warnings"]
        output = "#{tool} found " \
          "#{errors.length} #{"error".pluralize(errors.length)}:\n" +
          errors.each_with_index.map { |error, index| "#{index + 1}) Error: #{describe_outcome(error)}" }.join("\n\n") +
          "\n"
        if warnings_enabled && warnings.length > 0
          output += "\nAnd " \
            "#{warnings.length} #{"warning".pluralize(warnings.length)}:\n" +
            warnings.each_with_index.map { |warnings, index| "#{index + 1}) Warning: #{describe_outcome(warnings)}" }.join("\n\n") +
            "\n"
        end
        output
      end
    end
  end
end
