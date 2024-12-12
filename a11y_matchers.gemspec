Gem::Specification.new do |s|
  s.name        = 'a11y_matchers'
  s.version     = '0.1.0'
  s.licenses    = ['MIT', 'ISC', 'MPL-2.0', 'BSD-3-Clause' ]
  s.summary     = "RSpec matchers for different accessibility testing tools"
  s.description = "includes RSpec matchers for Deque's axe, kayle's fork of HTMLCS, SiteImprove's alfa and QualWeb"
  s.authors     = ["Daniel Schulz"]
  s.email       = 'daniel.schulz@makandra.de'
  s.files       = Dir['lib/**/*'] + Dir['assets/build/*.js'] + %w(Gemfile LICENSE.txt README.md LICENSE-3RD-PARTY.txt a11y_matchers.gemspec)
  s.homepage    = 'https://makandra.de'
  s.metadata    = { "source_code_uri" => "https://github.com/example/example" }

  s.add_dependency "capybara", ">= 3.0"
  s.add_dependency "selenium-webdriver", ">= 4.0"
  s.add_dependency "rspec"
end
