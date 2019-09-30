import { HdadeliveryPage } from './app.po';

describe('hdadelivery App', function() {
  let page: HdadeliveryPage;

  beforeEach(() => {
    page = new HdadeliveryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
