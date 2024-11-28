module A11yMatchers
  GEM_ROOT = Gem::Specification.find_by_name('a11y_matchers').gem_dir
  JS_PATH = File.join(GEM_ROOT, "assets/build/")

  require_relative 'a11y_matchers/helpers/alfa'
  require_relative 'a11y_matchers/helpers/kayle'
  require_relative 'a11y_matchers/helpers/qualweb'
  require_relative 'a11y_matchers/helpers/axe'
  require_relative 'a11y_matchers/helpers/a11y'
  require_relative 'a11y_matchers/matchers'
  require_relative 'a11y_matchers/configuration'
end

