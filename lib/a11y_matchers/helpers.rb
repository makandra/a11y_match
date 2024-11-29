require_relative "./helpers/alfa"
require_relative "./helpers/axe"
require_relative "./helpers/qualweb"
require_relative "./helpers/kayle"
require_relative './helpers/a11y'

module A11yMatchers
  module Helpers
    include A11yMatchers::Helpers::A11y
    include A11yMatchers::Helpers::Alfa
    include A11yMatchers::Helpers::Axe
    include A11yMatchers::Helpers::Qualweb
    include A11yMatchers::Helpers::Kayle
  end
end
