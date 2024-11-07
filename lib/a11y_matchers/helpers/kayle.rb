# Source: https://github.com/makandra/capybara-lockstep/blob/main/lib/capybara-lockstep/helper.rb

module A11yMatchers
  module Helpers
    module Kayle

      HTMLCS_JS_PATH = File.join(A11yMatchers::JS_PATH, "htmlcs.js")
      HTMLCS_HELPER_JS = IO.read(HTMLCS_JS_PATH)

      KAYLE_JS_PATH = File.join(A11yMatchers::JS_PATH, "kayle.js")
      KAYLE_HELPER_JS = IO.read(KAYLE_JS_PATH)

      def htmlcs_helper_js(options = {})
        HTMLCS_HELPER_JS # + alfa_helper_config_js(options)
      end
      def kayle_helper_js(options = {})
        KAYLE_HELPER_JS # + alfa_helper_config_js(options)
      end

      def kayle_helper(options = {})
        tag_options = {}

        # Add a CSRF nonce if supported by our Rails version
        if Rails.version >= '5'
          tag_options[:nonce] = options.fetch(:nonce, true)
        end

        javascript_tag(htmlcs_helper_js(options), tag_options) + javascript_tag(kayle_helper_js(options), tag_options)
      end

      private

      # def xx_helper_config_js(options = {})
      #   # TODO config
      #   js = ''

      #   # if (debug = options.fetch(:debug, Lockstep.debug?))
      #   #   js += "\nCapybaraLockstep.debug = #{debug.to_json}"
      #   # end

      #   # if (wait_tasks = options.fetch(:wait_tasks, Lockstep.wait_tasks))
      #   #   js += "\nCapybaraLockstep.waitTasks = #{wait_tasks.to_json}"
      #   # end

      #   js
      # end

    end
  end
end

if defined?(ActionView::Base)
  ActionView::Base.include A11yMatchers::Helpers::Kayle
end
