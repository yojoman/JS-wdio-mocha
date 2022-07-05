const BasePage = require("./base_page.js");

class SecurePage extends BasePage {
  get newMessageButton() {
    return $(".button.button-large.button-solid-norm.mt0-25.w100.no-mobile");
  }
  get letterDestination() {
    return $("input[placeholder='Email address']");
  }
  get letterSubject() {
    return $("input[placeholder='Subject']");
  }

  get letterStatus() {
    return $(".mr0-5.mauto");
  }

  get closeLetterButton() {
    return $('button[data-testid="composer:close-button"]');
  }

  get draftsFolderButton() {
    return $("a[title*=Drafts]");
  }

  get titleOfFirstLetterFromDrafts() {
    return $("div[style='--index:0;']");
  }

  get letterDestionationFromDraft() {
    return $(".mr0-5.align-top");
  }

  // Cелектор для текстового поля письма
  // get letterTextField() {
  //   return $(".protonmail_signature_block-proton");
  // }

  get sendLetterButton() {
    return $(".pl1.pr1.no-mobile");
  }

  get letterStatusInFolders() {
    return $(".flex-item-fluid.text-center.p3");
  }

  get sentFolderButton() {
    return $("a[title*=Sent]");
  }

  get selectAllCheckBox() {
    return $(".checkbox-input");
  }

  get deletePermanentlyButton() {
    return $("button[data-testid='toolbar:deletepermanently']");
  }

  get deletePermanentlySubmitButton() {
    return $("button[data-testid='permanent-delete-modal:submit']");
  }

  get userMenu() {
    return $(
      ".mtauto.mbauto.text-semibold.rounded.border.p0-25.inline-block.user-initials.relative.flex.flex-item-noshrink"
    );
  }

  get signOutButton() {
    return $("button[class='button button-solid-norm w100']");
  }

  get notificationSentLetter() {
    return $(".p1.mb0-5.text-break.notification.notification--in.bg-success");
  }

  /////////////////////////////////

  async verifyTitle(title) {
    await this.newMessageButton.waitForDisplayed();
    await expect(browser).toHaveTitleContaining(title);
  }

  async openNewMessage() {
    await this.newMessageButton.click();
  }

  async fillLetter(destination, subject) {
    await this.letterDestination.waitForDisplayed();
    await this.letterDestination.click();
    await browser.keys(destination);
    await browser.keys("Tab");
    await browser.keys("Tab");
    await browser.keys("Tab");
    await browser.keys("Tab");
    await browser.keys(subject);
    await browser.keys("Tab");
    await browser.keys("Text example");
    //await browser.sleep("10000");
  }

  // async fillLetter(destination, subject) {
  //   await this.letterDestination.waitForDisplayed();
  //   await this.letterDestination.setValue(destination);
  //   await this.letterSubject.setValue(subject);
  //   // Попытка добраться до текстового поля письма
  //   // await this.letterTextField.click();
  //   // await browser.keys('text exmaple')
  // }

  async verifyLetterFilledProperly(destination, subject) {
    await expect(this.letterDestionationFromDraft).toHaveTextContaining(
      destination
    );
    await expect(this.letterSubject).toHaveValueContaining(subject);
  }

  async verifyLetterIsSaved() {
    await expect(this.letterStatus).toBeExisting();
    await expect(this.letterStatus).toHaveTextContaining("Saved");
  }

  async closeLetter() {
    await this.closeLetterButton.click();
  }

  async openDraftsFolder() {
    await this.draftsFolderButton.waitForDisplayed();
    await this.draftsFolderButton.click();
  }

  async verifyLetterInDrafts(text) {
    await this.titleOfFirstLetterFromDrafts.waitForDisplayed();
    await expect(this.titleOfFirstLetterFromDrafts).toBeExisting();
    await expect(this.titleOfFirstLetterFromDrafts).toHaveTextContaining(text);
  }

  async openLetterFromDrafts() {
    await this.titleOfFirstLetterFromDrafts.click();
  }

  async letterContainsCorrectInfo(destination, subject) {
    await this.letterSubject.waitForDisplayed();
    await expect(this.letterDestionationFromDraft).toHaveTextContaining(
      destination
    );
    await expect(this.letterSubject).toHaveValueContaining(subject);
  }

  async sendLetter() {
    await this.sendLetterButton.waitForDisplayed();
    await this.sendLetterButton.click();
  }

  async verifyLetterSent() {
    await this.notificationSentLetter.waitForDisplayed();
    await expect(this.notificationSentLetter).toHaveTextContaining(
      "Message sent"
    );
  }

  async verifyNoLettersInDrafts() {
    await this.letterStatusInFolders.waitForDisplayed();
    await expect(this.letterStatusInFolders).toHaveTextContaining(
      "No messages found"
    );
  }
  async openSentFolder() {
    await this.sentFolderButton.click();
  }
  async verifyLettersInSent(text) {
    await expect(this.titleOfFirstLetterFromDrafts).toBeExisting();
    await expect(this.titleOfFirstLetterFromDrafts).toHaveTextContaining(text);
  }

  async sellectAllLetters() {
    await this.selectAllCheckBox.click();
  }
  async deleteAllLettersFromSent() {
    await this.deletePermanentlyButton.click();
    await this.deletePermanentlySubmitButton.waitForDisplayed();
    await this.deletePermanentlySubmitButton.click();
  }

  async verifyLettersNotPresentInSent() {
    await this.letterStatusInFolders.waitForDisplayed();
    await expect(this.letterStatusInFolders).toBeExisting();
    await expect(this.letterStatusInFolders).toHaveTextContaining(
      "No messages found"
    );
  }

  async openUserMenu() {
    await this.userMenu.click();
  }
  async signOut() {
    await this.signOutButton.waitForDisplayed();
    await this.signOutButton.click();
  }
}

module.exports = SecurePage;
