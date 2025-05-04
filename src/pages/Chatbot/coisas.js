const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://draft5.gg/equipe/330-FURIA';

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Espera o conteúdo da seção do próximo jogo carregar
  await page.waitForXPath('/html/body/div[2]/div[2]/div[5]/div/div/div/div[1]/div[4]/p[1]');

  // Próximo jogo - data
  const [dateEl] = await page.$x('/html/body/div[2]/div[2]/div[5]/div/div/div/div[1]/div[4]/p[1]');
  const dateText = await page.evaluate(el => el.textContent.trim(), dateEl);

  // Time 1
  const [teamEl] = await page.$x('/html/body/div[2]/div[2]/div[5]/div/div/div/div[1]/div[4]/a[1]/div[1]/div[1]/div[1]/span');
  const teamText = await page.evaluate(el => el.textContent.trim(), teamEl);

  console.log(`📅 Próximo jogo: ${dateText}`);
  console.log(`🆚 Time 1: ${teamText}`);

  // Pega os dois últimos jogos passados
  const pastMatches = await page.$$('[class*=past-match]');
  const lastTwoMatches = pastMatches.slice(0, 2);

  for (let i = 0; i < lastTwoMatches.length; i++) {
    const match = lastTwoMatches[i];
    console.log(`\n🔙 Jogo passado ${i + 1}:`);

    const date = await match.$eval('p[class*=match-date]', el => el.textContent.trim());
    const teams = await match.$$eval('div[class*=team-name]', els => els.map(e => e.textContent.trim()));
    const score = await match.$eval('div[class*=match-score]', el => el.textContent.trim());

    console.log(`📅 Data: ${date}`);
    console.log(`🆚 Times: ${teams.join(' vs ')}`);
    console.log(`🔢 Placar: ${score}`);
  }

  await browser.close();
})();
