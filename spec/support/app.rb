require 'sinatra'
require 'base64'

class App < Sinatra::Base
  include A11yMatchers::Helpers

  get '/pass' do
    render_content(<<~HTML, <<~HEAD)
      <main id="main">
        <h1>Hello World</h1>
        <img src="#{image_source}", alt="This is a very descriptive alt text" />
        <a href="/fail">Failing page</a>
      </main>
    HTML
    <title>Accessibility test page</title>
    <a href="#main"> Skip to main content</a>
    HEAD
  end

  get '/fail' do
    render_content(<<~HTML)
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <img src="#{image_source}" />
    HTML
  end


  private
  def render_content(content, head = "")
    <<~HTML
      <html lang="en">
        <head>
          #{head}
          #{a11y_script_helpers}
        </head>
        <body>
          #{content}
        </body>
      </html>
    HTML
  end

  def image_source
    "data:image/png;base64,#{Base64.encode64(File.read("spec/fixtures/image.png")).gsub("\n", "")}"
  end

  def a11y_script_helpers
    <<~HTML
      <script>#{axe_helper_js}</script>
      <script>#{alfa_helper_js}</script>
      <script>#{qualweb_helper_js}</script>
      <script>#{kayle_helper_js}</script>
      <script>#{htmlcs_helper_js}</script>
    HTML
  end
end
