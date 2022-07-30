const BasePage = require("./base.page.js");

class LoginPage extends BasePage {
  get inputUserName() {
    return $('input[autocomplete="username"]');
  }

  get inputUserPassword() {
    return $("#password");
  }

  get staySignedIn() {
    return $("#staySignedIn");
  }

  get buttonSubmit() {
    return $("button[type=submit]");
  }

  async getStaySignInStatus() {
    if (this.staySignedIn.isSelected()) {
      this.staySignedIn.click();
    }
  }

  async login(username, password) {
    await this.inputUserPassword.waitForDisplayed();
    await this.inputUserName.setValue(username);
    await this.inputUserPassword.setValue(password);
    await this.getStaySignInStatus();
    await this.buttonSubmit.click();
  }

  async open() {
    return await super.open("/");
  }

  async verifyTitle(title) {
    await this.inputUserPassword.waitForDisplayed();
    await super.verifyTitle(title);
  }
}

module.exports = new LoginPage();
