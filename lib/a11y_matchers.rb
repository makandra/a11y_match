module A11yMatchers
  GEM_ROOT = Pathname(Gem::Specification.find_by_name('a11y_matchers').gem_dir)
  JS_PATH = GEM_ROOT.join("assets","build")

  require_relative 'a11y_matchers/helpers'
  require_relative 'a11y_matchers/matchers'
  require_relative 'a11y_matchers/configuration'
  require_relative 'a11y_matchers/logger'
end
