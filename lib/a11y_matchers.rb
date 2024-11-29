module A11yMatchers
  GEM_ROOT = Pathname(Gem::Specification.find_by_name('a11y_matchers').gem_dir)
  JS_PATH = GEM_ROOT.join("assets","build")

  require_relative 'a11y_matchers/helpers/alfa'
  require_relative 'a11y_matchers/helpers/kayle'
  require_relative 'a11y_matchers/helpers/qualweb'
  require_relative 'a11y_matchers/helpers/axe'
  require_relative 'a11y_matchers/helpers/a11y'
  require_relative 'a11y_matchers/matchers'
  require_relative 'a11y_matchers/configuration'
  require_relative 'a11y_matchers/logger'
end
