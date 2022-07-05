const creds = require("../data/credentials.js");
const testData = require("../data/testData.js");
const LoginPage = require("../pages/login_page");
const loginPage = new LoginPage();
const SecurePage = require("../pages/secure_page.js");
const securePage = new SecurePage();

describe("Email test example", () => {
  it("Should login", async () => {
    await loginPage.open();
    await loginPage.login(creds.username, creds.password);
    await securePage.verifyTitle(`Inbox | ${creds.myEmail} | Proton Mail`);
  });

  it("Should create a new letter", async () => {
    await securePage.openNewMessage();
    await securePage.fillLetter(testData.destination, testData.subject);
    await securePage.verifyLetterFilledProperly(
      testData.destination,
      testData.subject
    );
  });

  it("The letter should be saved as a draft", async () => {
    await securePage.verifyLetterIsSaved();
  });

  it("The letter should be present in Draft folder", async () => {
    await securePage.closeLetter();
    await securePage.openDraftsFolder();
    await securePage.verifyLetterInDrafts(testData.subject);
  });

  it("The letter contains the same info", async () => {
    await securePage.openLetterFromDrafts();
    await securePage.letterContainsCorrectInfo(
      testData.destination,
      testData.subject
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
    await securePage.verifyLettersInSent(testData.subject);
  });

  it("Delete letter from Sent folder", async () => {
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

