# Source: https://github.com/makandra/capybara-lockstep/blob/main/lib/capybara-lockstep/helper.rb

module A11yMatchers
  module Helpers
    module Qualweb

      JS_PATH = File.join(A11yMatchers::JS_PATH, "qualweb.js")
      HELPER_JS = IO.read(JS_PATH)

      def qualweb_helper_js(options = {})
        HELPER_JS # + qualweb_helper_config_js(options)
      end

      def qualweb_helper(options = {})
        tag_options = {}

        # Add a CSRF nonce if supported by our Rails version
        if Rails.version >= '5'
          tag_options[:nonce] = options.fetch(:nonce, true)
        end

        javascript_tag(qualweb_helper_js(options), tag_options)
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
  ActionView::Base.include A11yMatchers::Helpers::Qualweb
end
