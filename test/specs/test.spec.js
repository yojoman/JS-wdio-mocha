const loginPage = require("../pages/login.page");
const securePage = require("../pages/secure.page.js");
const resources = require("../resources/data.js");

describe("Email test example", () => {
  before(async () => {
    await browser.maximizeWindow();
  });

  after(async () => {
    await browser.refresh();
    await loginPage.verifyTitle("Proton Account");
    await browser.saveScreenshot("result/testing result.png");
  });

  it("Should login", async () => {
    await loginPage.open();
    await loginPage.login(resources.username, resources.password);
    await securePage.verifyTitle(`Inbox | ${resources.myEmail} | Proton Mail`);
  });

  it("Should create a new letter", async () => {
    await securePage.openNewMessage();
    await securePage.fillLetter(
      resources.destination,
      resources.subject,
      resources.letterText
    );
    await securePage.verifyLetterFilledProperly(
      resources.destination,
      resources.subject
    );
  });

  it("The letter should be saved as a draft", async () => {
    await securePage.verifyLetterIsSaved();
  });

  it("The letter should be present in Draft folder", async () => {
    await securePage.closeLetter();
    await securePage.openDraftsFolder();
    await securePage.verifyLetterInDrafts(resources.subject);
  });

  it("The letter contains the same info", async () => {
    await securePage.openLetterFromDrafts();
    await securePage.letterContainsCorrectInfo(
      resources.destination,
      resources.subject
    );
  });

  it("Should send the letter ", async () => {
    await securePage.sendLetter();
    await securePage.verifyLetterSent();
  });

  it("The letter should disappeared from Draft folder", async () => {
    await securePage.openDraftsFolder();
    await securePage.verifyNoLettersInDrafts();
  });

  it("The letter should be present in Sent folder", async () => {
    await securePage.openSentFolder();
    await securePage.verifyLettersInSent(resources.subject);
  });

  it("Delete all letters from Sent folder", async () => {
    await securePage.sellectAllLetters();
    await securePage.deleteAllLettersFromSent();
    await securePage.verifyLettersNotPresentInSent();
  });

  it("User should sign out", async () => {
    await securePage.openUserMenu();
    await securePage.signOut();
    await loginPage.verifyTitle("Proton Account");
  });
});
