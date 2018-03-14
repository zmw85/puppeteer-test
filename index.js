const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const res = await page.goto('https://www.google.com');
  console.log(res.ok());
  await browser.close();
});