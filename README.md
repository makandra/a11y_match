# A11y_matchers

This ruby gem integrates different accessibility testing tools into Capybara testing with RSpec. 
Implemented tools are: Alfa, axe, kayle (htmlcs) and qualweb.

Direct integration of the tools in browser testing makes it much easier to regularly use such tools, rather than having to use different browser extensions. 
Additionally, this gem aggregates the output of all tools.

## How does this tool help
Integration of the tools is made easier, since their code is included within the gem, bundled for the browser and abstracted to a similar calling and return interface.
Without this gem, one would have to implement a different calling API and parse different output for each of the tools.

This gem includes RSpec matchers to start audits for each of the tools and parses the output to provide similar looking error messages.

## Installation
Installation is very straightforward in a Rails project which uses Capybara together with RSpec and the Selenium WebDriver.
It can also work with Cucumber by writing custom steps for the provided RSpec matchers.

### Install the Ruby gem
Assuming that you're using Rails, add this to your application's `Gemfile`:
```ruby
group :test do
  gem 'a11y_matchers', path: '~/repos/ma/a11y_matchers'
end
```
And then execute:
```bash
bundle install
```

### Including the JavaScript code
To install, simply include the corresponding helpers. 

If you want to use all tools, simply insert the `a11y_helper` into your application layouts:
```erb
<%= a11y_helper if defined?(A11yMatchers::Matchers) %>
```
This adds script tags for all different tools which load the necessary code

There are also helpers for each of the individual tools if you only want to use a subset:
```erb
<%= alfa_helper if defined?(A11yMatchers::Matchers::Alfa) %>
<%= kayle_helper if defined?(A11yMatchers::Matchers::Kayle) %>
<%= qualweb_helper if defined?(A11yMatchers::Matchers::Qualweb) %>
<%= axe_helper if defined?(A11yMatchers::Matchers::Axe) %>
```

### Loading the matchers
To be able to use the RSpec matchers witch are provided by this gem, load them  into RSpec:
```ruby
RSpec.configure do |config|
  config.include(A11yMatchers::Matchers)
end
```

## How to use
After the installation, the accessibility testing tools can be run by using the corresponding RSpec matchers.

```ruby
# Runs all Tools
expect(page).not_to have_a11y_issues

# `have_a11y_issues` corresponds to calling all the matchers individually 
# in an `aggregate_failures` block  as below
aggregate_failures "a11y issues" do
  expect(page).not_to have_alfa_issues
  expect(page).not_to have_axe_issues
  expect(page).not_to have_kayle_issues
  expect(page).not_to have_qualweb_issues
end
```
The `have_a11y_issues` matcher calls the tools in an [`aggregate_failures`](https://rspec.info/features/3-12/rspec-core/expectation-framework-integration/aggregating-failures/) block so that the errors by all tools are shown at once.
Of course, it is also possible to only test with a subset of tools by only calling their matchers.

The output then looks something like this:
```
# Running specs
> Only: spec/features/movies/crud_spec.rb


Randomized with seed 38931

CRUD Movies
  CRUD Movies (FAILED - 1)

Failures:

  1) CRUD Movies CRUD Movies
     Failure/Error: expect(page).not_to have_a11y_issues

       Got 4 failures from failure aggregation block "a11y issues":

         1) Alfa found 2 errors:
            1) Error: The image does not have an accessible name
               More info: https://alfa.siteimprove.com/rules/sia-r2
               Occurences:
                 - /html[1]/body[1]/main[1]/img[1]
                 - /html[1]/body[1]/main[1]/img[2]
                 - /html[1]/body[1]/main[1]/img[3]
                 - /html[1]/body[1]/main[1]/img[4]

            2) Error: There is no content between this heading and the next
               More info: https://alfa.siteimprove.com/rules/sia-r78
               Occurences:
                 - /html[1]/body[1]/main[1]/h1[1]

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:40:in `block (3 levels) in <module:Matchers>'

         2) Axe found 1 error:
            1) Error: Ensure <img> elements have alternative text or a role of none or presentation
               More info: https://dequeuniversity.com/rules/axe/4.10/image-alt?application=axeAPI
               Occurences:
                 - img:nth-child(1)
                 - img:nth-child(2)
                 - img:nth-child(3)
                 - img:nth-child(4)

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:41:in `block (3 levels) in <module:Matchers>'

         3) Kayle found 1 error:
            1) Error: Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.
               More info: WCAG2AA.Principle1.Guideline1_1.1_1_1.H37
               Occurences:
                 - /HTML/BODY[1]/MAIN[1]/IMG[1]
                 - /HTML/BODY[1]/MAIN[1]/IMG[4]

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:42:in `block (3 levels) in <module:Matchers>'

         4) QualWeb found 2 errors:
            1) Error: The test target doesn't have an accessible name.
               More info: https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/
               Occurences:
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(1)
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(2)
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(3)
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(4)

            2) Error: The first focusable control on the Web page links to an inexistent element.
               More info: https://www.w3.org/WAI/WCAG21/Techniques/general/G1
               Occurences:
                 - html:nth-of-type(1) > body > header:nth-of-type(1) > nav:nth-of-type(1) > a:nth-of-type(1)

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:43:in `block (3 levels) in <module:Matchers>'
     # ./spec/features/movies/crud_spec.rb:4:in `block (2 levels) in <main>'
     # ./spec/support/database_cleaner.rb:16:in `block (2 levels) in <main>'

Finished in 2.17 seconds (files took 0.76155 seconds to load)
1 example, 1 failure

Failed examples:

rspec ./spec/features/movies/crud_spec.rb:2 # CRUD Movies CRUD Movies

Randomized with seed 38931


x Specs failed.
```

## Configuration
TBD

## Information about the tools
TODO
