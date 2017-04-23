import { NgwsPage } from './app.po';

describe('ngws App', () => {
  let page: NgwsPage;

  beforeEach(() => {
    page = new NgwsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
