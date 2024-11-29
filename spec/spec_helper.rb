require 'byebug'
require "a11y_matchers"
require 'capybara'
require 'capybara/rspec'
require 'selenium-webdriver'

# Load all files in spec/support
Dir["#{__dir__}/support/**/*.rb"].each { |f| require f }



RSpec.configure do |config|
  config.include Capybara::DSL
  config.include Capybara::RSpecMatchers
  config.include A11yMatchers::Matchers
  config.include A11yMatchers::Helpers
end


options = Selenium::WebDriver::Chrome::Options.new.tap do |opts|
  opts.add_argument('--headless') unless ENV['NO_HEADLESS']
  opts.add_argument('--window-size=1280,1024')
  opts.add_argument('--auto-open-devtools-for-tabs') if ENV.key?('DEBUGGER')
end

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.default_driver = :chrome

Capybara.configure do |config|
  config.app = App
  config.server_host = 'localhost'
  config.default_max_wait_time = 1
end

RSpec.configure do |config|
  config.before(:each) do
    # A11yMatcher config here
  end
end
