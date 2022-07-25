const BasePage = require("./base_page.js");

class SecurePage extends BasePage {
  get newMessageButton() {
    return $(".//button[text()='New message']");
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
    return $('button[data-testid*="close-button"]');
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

  get sendLetterButton() {
    return $(".//span[text()='Send']");
  }

  get letterStatusInFolders() {
    return $(".//h3[text()='No messages found']");
  }

  get sentFolderButton() {
    return $("a[title*=Sent]");
  }

  get selectAllCheckBox() {
    return $(".checkbox-input");
  }

  get deletePermanentlyButton() {
    return $("button[data-testid*='deletepermanently']");
  }

  get deletePermanentlySubmitButton() {
    return $(".//button[text()='Delete']");
  }

  get userMenu() {
    return $(".//button[contains(@class,'relative')]");
  }

  get signOutButton() {
    return $(".//button[text()='Sign out']");
  }

  get notificationSentLetter() {
    return $(".//span[text()='Message sent.']");
  }

  async verifyTitle(title) {
    await this.newMessageButton.waitForDisplayed();
    await super.verifyTitle();
  }

  async openNewMessage() {
    await this.newMessageButton.click();
  }

  async fillLetter(destination, subject, text) {
    await this.letterDestination.waitForDisplayed();
    await this.letterDestination.click();
    await browser.keys(destination);
    await browser.keys("Tab");
    await browser.keys("Tab");
    await browser.keys("Tab");
    await browser.keys("Tab");
    await browser.keys(subject);
    await browser.keys("Tab");
    await browser.keys(text);
  }

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

module.exports = new SecurePage();
