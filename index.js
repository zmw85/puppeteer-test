const puppeteer = require('puppeteer');
const url = require('url');
const qs = require('qs');

puppeteer.launch({
  // args: ['--user-agent Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36']
}).then(async browser => {
  const page = await browser.newPage();

  

  const res = await page.goto('http://www.onthehouse.com.au/real_estate/nsw/newington_2127/owens_avenue?unitNumber=3&streetNumber=7');
  console.log(res.status());

  const selector = '[name="search.searchResults"] .property-list-image';
  const firstPropImage = await page.waitForSelector(selector, {timeout: 3000});
  
  if (firstPropImage) {
    const bgImageUrl = await page.evaluate(() => {
      const bgImage = $('[name="search.searchResults"] .property-list-image').prop('style').backgroundImage;
      
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      return (bgImage.match(urlRegex) || [''])[0];
    });

    if (bgImageUrl) {
      const qsRegex = /height=[\d]*/;
      // ((bgImage.match(regex) || [''])[0]
      // const urlParsed = url.parse(bgImageUrl);

      // qs.parse(urlParsed.query)
      
      console.log(bgImageUrl.replace(qsRegex, 'height=200'));
    }
    
    // await firstPropImage.screenshot({path: 'image.png'});
    // const style = await firstPropImage.getProperty('style');
    // console.log(getComputedStyle(firstPropImage).backgroundImage);

    // const style = await firstPropImage.getProperty('style');

    // if (style) {
    //   console.log(style);
    // }
  }
  console.log('finish looking for property images');

  // await page.waitFor(2000);
  await page.screenshot({path: 'page.png'})
  console.log('screenshot taken');
  await browser.close();
});