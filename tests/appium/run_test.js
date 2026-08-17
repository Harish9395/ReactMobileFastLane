const { remote } = require("webdriverio");

describe("Android application", () => {
  let driver;

  before(async () => {

    driver = await remote({
      protocol: "https",
      hostname: "ondemand.eu-central-1.saucelabs.com",
      port: 443,

      path: "/wd/hub",

      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,

      capabilities: {
        platformName: "Android",

        "appium:deviceName": "Android GoogleAPI Emulator",

        "appium:platformVersion": "12.0",

        "appium:automationName": "UiAutomator2",

        "appium:app": process.env.SAUCE_APP,

        "sauce:options": {
          build: `GitHub Actions ${process.env.GITHUB_RUN_NUMBER}`,
          name: "Android automated test",
          appiumVersion: "stable"
        }
      }
    });

  });


  it("should launch the application", async () => {

    console.log("Application launched successfully");

    await driver.pause(5000);

    // Add your actual application assertions here.

    expect(driver).toBeDefined();

  });


  after(async () => {

    if (driver) {
      await driver.deleteSession();
    }

  });

});
