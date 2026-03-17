import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { segmento, cidade, maxResults = 15 } = req.body;

  if (!segmento || !cidade) {
    return res.status(400).json({ error: 'Segmento e cidade são obrigatórios' });
  }

  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled'
      ]
    });

    const page = await browser.newPage();
    
    // Configurar user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const searchQuery = `${segmento} em ${cidade}`;
    const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Aguardar resultados carregarem
    await page.waitForSelector('div[role="feed"]', { timeout: 30000 });

    const leads = [];
    const seenPhones = new Set();

    // Função para extrair dados de um resultado
    const extractData = async () => {
      return await page.evaluate(() => {
        const results = [];
        const items = document.querySelectorAll('div[role="feed"] > div > div[class*="Nv2PK"]');
        
        items.forEach((item) => {
          try {
            // Nome
            const nameEl = item.querySelector('div[class*="qBF1b"] font');
            const name = nameEl ? nameEl.textContent.trim() : '';
            
            // Telefone (geralmente em "Ver telefone" ou similar)
            let phone = '';
            const phoneEl = item.querySelector('button[data-item-id*="phone"]');
            if (phoneEl) {
              const phoneText = phoneEl.textContent;
              const phoneMatch = phoneText.match(/[\d\s\-\(\)]+/);
              if (phoneMatch) {
                phone = phoneMatch[0].replace(/\D/g, '');
              }
            }
            
            // Endereço
            const addressEl = item.querySelector('span[class*="W4Efsd"]');
            const address = addressEl ? addressEl.textContent.trim() : '';
            
            if (name) {
              results.push({
                nome: name,
                telefone: phone,
                endereco: address
              });
            }
          } catch (e) {}
        });
        
        return results;
      });
    };

    // Coletar resultados
    let currentPage = 1;
    const maxPages = Math.ceil(maxResults / 15);
    
    while (leads.length < maxResults && currentPage <= maxPages) {
      const pageResults = await extractData();
      
      pageResults.forEach(result => {
        if (leads.length >= maxResults) return;
        
        // Deduplicar por telefone
        if (result.telefone && seenPhones.has(result.telefone)) return;
        if (result.telefone) seenPhones.add(result.telefone);
        
        leads.push(result);
      });
      
      // Tentar ir para próxima página
      if (leads.length < maxResults) {
        try {
          const nextButton = await page.$('button[aria-label*="Próxima"], button[aria-label*="Next"]');
          if (nextButton) {
            await nextButton.click();
            await page.waitForTimeout(2000);
            currentPage++;
          } else {
            break;
          }
        } catch (e) {
          break;
        }
      }
    }

    await browser.close();

    return res.status(200).json({
      success: true,
      total: leads.length,
      leads: leads.slice(0, maxResults)
    });

  } catch (error) {
    console.error('Scrape error:', error);
    if (browser) await browser.close();
    return res.status(500).json({ error: error.message });
  }
}
