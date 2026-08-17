const { remote } = require('webdriverio');

(async () => {
  const username = process.env.SAUCE_USERNAME;
  const accessKey = process.env.SAUCE_ACCESS_KEY;
  if (!username || !accessKey) {
    console.error('Set SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables');
    process.exit(1);
  }

  const opts = {
    protocol: 'https',
    hostname: 'ondemand.saucelabs.com',
    port: 443,
    path: '/wd/hub',
    user: username,
    key: accessKey,
    capabilities: {
      platformName: 'Android',
      deviceName: 'Android GoogleAPI Emulator',
      automationName: 'UiAutomator2',
      app: 'sauce-storage:myapp.apk',
      appWaitActivity: '*',
      autoGrantPermissions: true
    }
  };

  const client = await remote(opts);
  console.log('Session started on Sauce Labs. Pausing 5s...');
  await client.pause(5000);
  await client.deleteSession();
  console.log('Session finished');
})().catch(err => { console.error(err); process.exit(1); });
