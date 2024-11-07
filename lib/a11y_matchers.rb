module A11yMatchers
  GEM_ROOT = Gem::Specification.find_by_name('a11y_matchers').gem_dir
  JS_PATH = File.join(GEM_ROOT, "assets/build/")

  require 'a11y_matchers/helpers/alfa'
  require 'a11y_matchers/helpers/kayle'
  require 'a11y_matchers/helpers/qualweb'
  require 'a11y_matchers/matchers'
end

