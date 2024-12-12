[!IMPORTANT]
This repository is part of a research project for a thesis. Don't use it for production yet.

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

To be able to use the RSpec matchers witch are provided by this gem, load them into RSpec:

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

Randomized with seed 4773

CRUD Movies
  CRUD Movies (FAILED - 1)

Failures:

  1) CRUD Movies CRUD Movies
     Failure/Error: expect(page).not_to have_a11y_issues

       Got 4 failures from failure aggregation block "a11y issues":

         1) Alfa found 2 errors:
            1) Error: The image does not have an accessible name
               Rule ID: "sia-r2"
               More info: https://alfa.siteimprove.com/rules/sia-r2
               Occurences:
                 - /html[1]/body[1]/main[1]/img[1]
                 - /html[1]/body[1]/main[1]/img[2]
                 - /html[1]/body[1]/main[1]/img[3]
                 - /html[1]/body[1]/main[1]/img[4]

            2) Error: There is no content between this heading and the next
               Rule ID: "sia-r78"
               More info: https://alfa.siteimprove.com/rules/sia-r78
               Occurences:
                 - /html[1]/body[1]/main[1]/h1[1]
                 - /html[1]/body[1]/main[1]/h1[2]
                 - /html[1]/body[1]/main[1]/h1[3]

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:46:in `block (3 levels) in <module:Matchers>'

         2) Axe found 1 error:
            1) Error: Ensure <img> elements have alternative text or a role of none or presentation
               Rule ID: "image-alt"
               More info: https://dequeuniversity.com/rules/axe/4.10/image-alt?application=axeAPI
               Occurences:
                 - img:nth-child(1)
                 - img:nth-child(2)
                 - img:nth-child(3)
                 - img:nth-child(4)

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:47:in `block (3 levels) in <module:Matchers>'

         3) Kayle found 1 error:
            1) Error: Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.
               Rule ID: "Principle1.Guideline1_1.1_1_1"
               More info: WCAG Criterion: https://www.w3.org/TR/WCAG2/#non-text-content, Technique: https://www.w3.org/WAI/WCAG22/Techniques/html/H37
               Occurences:
                 - /HTML/BODY[1]/MAIN[1]/IMG[1]
                 - /HTML/BODY[1]/MAIN[1]/IMG[4]

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:48:in `block (3 levels) in <module:Matchers>'

         4) QualWeb found 2 errors:
            1) Error: The test target doesn't have an accessible name.
               Rule ID: "QW-ACT-R17"
               More info: https://www.w3.org/WAI/standards-guidelines/act/rules/23a2a8/
               Occurences:
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(1)
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(2)
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(3)
                 - html:nth-of-type(1) > body > main:nth-of-type(1) > img:nth-of-type(4)

            2) Error: The first focusable control on the Web page links to an inexistent element.
               Rule ID: "QW-WCAG-T23"
               More info: https://www.w3.org/WAI/WCAG21/Techniques/general/G1
               Occurences:
                 - html:nth-of-type(1) > body > header:nth-of-type(1) > nav:nth-of-type(1) > a:nth-of-type(1)

            /home/daniel/repos/ma/a11y_matchers/lib/a11y_matchers/matchers.rb:49:in `block (3 levels) in <module:Matchers>'
     # ./spec/features/movies/crud_spec.rb:4:in `block (2 levels) in <main>'
     # ./spec/support/database_cleaner.rb:16:in `block (2 levels) in <main>'

Finished in 2.45 seconds (files took 1.02 seconds to load)
1 example, 1 failure

Failed examples:

rspec ./spec/features/movies/crud_spec.rb:2 # CRUD Movies CRUD Movies

Randomized with seed 4773

x Specs failed.
```

## Configuration

There are general options (affecting all tools) and tool specific options.

### General Configuration Options

The general configuration options are (with the defaults as shown here):

```Ruby
A11yMatchers.configure do |config|
  config.on_violation = :fail # Other options: :log
  config.on_warning = :ignore # Other options: :fail | :log
  config.audit_wait_time = 10 # Maximum runtime of tools before a timeout occurs
  config.log_directory = "" # Defaults to RAILS_ROOT/log for rails projects and otherwise to the gem root directory
end
```

`on_violation` and `on_warning` allow configuring the behaviour when tools find accessibility errors for easier integration into existing projects.
When integrating accessibility testing into a project, you can only log the errors at first to get an overview of the amount of errors.

- `:fail`: Errors and Warnings make the matcher fail and lead to red tests and get shown in the test output
- `:log`: Errors and Warnings don't make matchers fail, the error/ warning only gets written to the log and don't appear in the test output
- `:ignore` (Only for warnings): Warnings don't fail tests, don't appear in the test output and don't get written to the log

### Tool specific configuration options

Below are the possible configuration options as example for the `alfa` tool.
The options are the same, across all tools but possible values differ.
Configure each tool by setting `config.alfa`, `config.axe`, `config.qualweb`, or `config.kayle`

```Ruby
A11yMatchers.configure do |config|
  # Controls if the tool is run when using the generic `have_a11y_issues` matcher
  config.alfa.enabled = true

  # Controls which rules are run by the tool, see below for possible values for each tool
  config.alfa.included_rules = [] # default value is tool specific

  # Exclude specific rules from being run by the tool by their id
  config.alfa.excluded_rules = []
end
```

- All tools support the options `:wcag_a`, `:wcag_aa`, `:wcag_aaa` to enable all rules of a specific WCAG level

#### Alfa

- Default value for included_rules: `[:wcag_aa, :best_practices, :techniques, :aria]`
- Other possible values to include a set of rules: `misc_rules` (for rules without any tags)
- Rule IDs (to include and exclude rules): of format `SIA-RXX` `XX` is a unique number, see the [list of rules](https://alfa.siteimprove.com/rules)

#### Axe

- Default value for included_rules: `[:wcag_aa, :best_practices]`
- Other possible values to include a set of rules: `"EN-301-549"` (for rules specified by the [EU standard](https://accessible-eu-centre.ec.europa.eu/content-corner/digital-library/en-3015492021-accessibility-requirements-ict-products-and-services_en))
- Rule IDs (to include and exclude rules): see the [list of rules](https://dequeuniversity.com/rules/axe/html)

#### Qualweb

- Default value for included_rules: `[:wcag_aa]`
  - This includes both [act](https://github.com/qualweb/qualweb/tree/main/packages/act-rules) and [WCAG](https://github.com/qualweb/qualweb/tree/main/packages/wcag-techniques) rules of this level (qualweb divides them into separate rulesets)
- Other possible values to include a set of rules: `:best_practices` to enable the [best-practices](https://github.com/qualweb/qualweb/tree/main/packages/best-practices) ruleset (disabled by default as it is not very high quality)
- Rule IDs (to include and exclude rules): see above linked lists of rules
  - `QW-BP-XX` for best practice rules
  - `QW-ACT-RXX` or 6 letter ACT Rule ID like `5f99a7` for ACT rules
  - `QW-WCAG-TXX` for WCAG rules (Qualweb calls them techniques)

#### Kayle

- Default value for included_rules: `[:wcag_aa]`
- Rule IDs (to include and exclude rules): of format `"Principle1.Guideline1_1.1_1_1"`, see the [list of rules](https://github.com/a11ywatch/kayle/blob/main/fast_htmlcs/Standards/WCAG2AAA/ruleset.ts)

## Contributing

TBD

## TODOs

TBD

## License

This gem's code is open source under the terms of the [MIT License](https://opensource.org/licenses/MIT)

Currently, the JavaScript code of all accessibility testing tools is bundled within this gem.
Therefore, it contains code licensed by other licenses of the projects listed here.
A list of all included projects and their licences is in the [LICENSE-3RD-PARTY.txt](LICENSE-3RD-PARTY.txt) file.

- [Axe](https://github.com/dequelabs/axe-core)
- [Alfa](https://github.com/siteimprove/alfa)
- [`fast_htmlcs` runner from Kayle](https://github.com/a11ywatch/kayle)
  - A fork of [HTMLCS](https://github.com/squizlabs/HTML_CodeSniffer)
- [QualWeb](https://github.com/qualweb/qualweb)
