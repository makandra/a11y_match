require_relative "./alfa"
require_relative "./axe"
require_relative "./qualweb"
require_relative "./kayle"

module A11yMatchers
  module Helpers
    module A11y

      def a11y_helper(options = {})
        alfa_helper(options) + axe_helper(options) + kayle_helper(options) + qualweb_helper(options)
      end
    end
  end
end

if defined?(ActionView::Base)
  ActionView::Base.include A11yMatchers::Helpers::A11y
end
