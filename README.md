# React Native mobile app + Fastlane + Sauce Labs

This repo shows how to create a simple React Native mobile app and use Fastlane to build an Android APK and upload it to Sauce Labs for testing with Appium.

Overview

- Use React Native (preferred) for a native mobile app.
- Use Fastlane inside `android/fastlane` to build and upload the APK to Sauce Labs storage.
- Use a sample Appium test (WebDriverIO) to run the uploaded APK on Sauce Labs.

Prerequisites

- Node.js & npm
- Java JDK and Android SDK (for Android builds)
- Android Studio (recommended to set up SDK/AVDs)
- Ruby + Bundler + fastlane (for running Fastlane lanes)
- A Sauce Labs account with `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` environment variables set

Quick start (React Native)

1. Initialize the React Native native projects (generates `android/` and `ios/` folders):

```bash
# from repo root
npx react-native init . --template react-native-template-bare-minimum
```

If the above fails, run in a separate folder and copy the generated `android/` folder into this repo.

2. Install JS dependencies and start Metro:

```bash
npm ci
npm start
```

3. Build Android locally:

```bash
cd android
./gradlew clean assembleRelease
```

4. Upload via Fastlane (we provide `android/fastlane/Fastfile`):

```bash
cd android
fastlane android upload_to_saucelabs
```

5. Run the sample Appium test (from repo root):

```bash
npm install --save-dev webdriverio
node tests/appium/run_test.js
```

CI

A GitHub Actions workflow is included (`.github/workflows/android_saucelabs.yml`) that builds the app and uploads the APK to Sauce Labs. If you switch to React Native, ensure the workflow runs `npx react-native` or that the `android/` folder is present in the repository.

Notes

- I added a minimal React Native JS scaffold (`App.js`, `index.js`, `app.json`, `package.json`). You still need to generate native projects with `npx react-native init` (or I can generate/copy the native folders for you).

Tell me if you want me to:
- run `npx react-native init` here to generate native `android/` and `ios/` folders (I can create the native files, but the operation is best run locally), or
- update the CI workflow to perform the `react-native` init step in the runner and build entirely in GitHub Actions.