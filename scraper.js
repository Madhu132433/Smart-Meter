const puppeteer = require('puppeteer');

async function getScrapedData() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Login and navigate to the required page
  await page.goto('http://35.200.231.106/2021/amr-fm/login.html', { waitUntil: 'networkidle2' });
  await page.type('#inputEmail', 'rahulchejara123@gmail.com');
  await page.type('#inputPassword', '123456');
  await page.click('.btn.btn-primary.btn-rounded.btn-floating.btn-block');
  await page.waitForNavigation();

  // Go to the report page
  await page.goto('http://35.200.231.106/2021/amr-fm/#/report/00000400', { waitUntil: 'networkidle2' });
  await page.waitForSelector('#historyDataTable');

  // Extract table data
  const tableData = await page.evaluate(() => {
    const rows = document.querySelectorAll('#historyDataTable tbody tr');
    return Array.from(rows).map(row => {
      const cells = row.querySelectorAll('td');
      return {
        dateTime: cells[0]?.textContent.trim(),
        cumulative: cells[1]?.textContent.trim(),
        totalizer: cells[2]?.textContent.trim(),
      };
    });
  });

  await browser.close();
  return tableData;
}

module.exports = { getScrapedData };
