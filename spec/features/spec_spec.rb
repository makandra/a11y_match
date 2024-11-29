describe 'spec setup' do

  it 'renders the app' do
    visit '/pass'
    expect(page).to have_content('Hello World')
  end
end
