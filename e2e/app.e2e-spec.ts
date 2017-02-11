import { MeterAppPage } from './app.po';

describe('meter-app App', function() {
  let page: MeterAppPage;

  beforeEach(() => {
    page = new MeterAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
