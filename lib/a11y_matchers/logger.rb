require 'logger'
module A11yMatchers
  class << self
    def logger
      @logger ||= new_logger
    end

    def time_logger
      @time_logger ||= new_time_logger
    end

    private

    def new_time_logger
      logger = Logger.new(A11yMatchers.configuration.log_directory.join('a11y_matcher_runtime.log'))
      logger.formatter = proc do |severity, datetime, progname, msg|
        "#{datetime.strftime('%Y-%m-%d %H:%M:%S')},#{progname},#{msg}\n"
      end
      logger
    end

    def new_logger
      logger = Logger.new(A11yMatchers.configuration.log_directory.join('a11y_matcher.log'), "daily", 1)
      original_formatter = Logger::Formatter.new
      original_formatter.datetime_format = '%R'
      # Prepend each line with metadata
      logger.formatter = proc do |severity, datetime, progname, msg|
        msg.split("\n").map do |line|
          original_formatter.call(severity, datetime, progname, line)
        end.join
      end
      logger
    end
  end
end
