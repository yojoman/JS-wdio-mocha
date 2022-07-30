module.exports = class BasePage {
  async open(path) {
    return await browser.url(path);
  }

  async verifyTitle(title) {
    return await expect(browser).toHaveTitle(title);
  }
};
