import { QtTestPage } from './app.po';

describe('qt-console-fnd App', function() {
  let page: QtTestPage;

  beforeEach(() => {
    page = new QtTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
