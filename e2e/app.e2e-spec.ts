import { AngSaPage } from './app.po';

describe('ang-sa App', function() {
  let page: AngSaPage;

  beforeEach(() => {
    page = new AngSaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
