describe 'Accessibility Audit' do
  describe 'Generic matcher' do
    it 'finds accessibility issues' do
      visit "/fail"
      expect(page).to have_a11y_issues
    end

    it 'does not find issues on a clean site' do
      visit "/pass"
      expect(page).not_to have_a11y_issues
    end
  end
end
