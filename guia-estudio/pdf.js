// Imprime una guia HTML a PDF con Chromium (Playwright).
// Uso: node pdf.js entrada.html salida.pdf "Texto del pie de pagina"
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const [entrada, salida, pie] = process.argv.slice(2);
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();
  await pagina.goto('file://' + path.resolve(entrada));
  await pagina.pdf({
    path: salida,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    outline: true,
    tagged: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#888">' + pie +
      ' · <span class="pageNumber"></span>/<span class="totalPages"></span></div>'
  });
  await navegador.close();
})();
