module A11yMatchers

  class ConfigurationMismatchError < StandardError
  end

  class ToolConfiguration
    attr_accessor :enabled, :included_rules, :excluded_rules

    def initialize(enabled: true, included_rules: [], excluded_rules: [])
      @enabled = enabled
      @included_rules = included_rules
      @excluded_rules = excluded_rules
    end
  end

  class Configuration
    attr_accessor :on_violation, :on_warning, :audit_wait_time
    attr_reader :alfa, :kayle, :axe, :qualweb, :log_directory
    def initialize
      @on_violation = :fail # :fail | :log
      @on_warning = :ignore # :fail | :log | :ignore
      @audit_wait_time = 5 * 60 # TODO set lower for prod
      @log_directory = (defined?(Rails) ? Rails.root : GEM_ROOT).join('log')

      @alfa = ToolConfiguration.new(enabled: true, included_rules: [:wcag_aa, :best_practices, :techniques, :aria])
      @axe = ToolConfiguration.new(enabled: true, included_rules: [:wcag_aa, :best_practices])
      @kayle = ToolConfiguration.new(enabled: true, included_rules: [:wcag_aa])
      @qualweb = ToolConfiguration.new(enabled: true, included_rules: [ :wcag_aa])
    end

    def log_directory=(path)
      @log_directory = path.is_a?(Pathname) ? path : Pathname.new(path)
    end
  end
end

module A11yMatchers
  class << self
    def configuration
      @configuration ||= A11yMatchers::Configuration.new
    end

    def configure
      yield(configuration)
    end
  end
end
