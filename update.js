const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── 1. Fix Instagram DM link ──
html = html.replace(
    'href="https://www.instagram.com/by_luna_blossom/"',
    'href="https://ig.me/m/by_luna_blossom"'
  );

// ── 2. POPUP "Encomenda Recebida": substitui a flor rosa por lilas + adiciona logo sem fundo ──
html = html.replace(
    /<div class="modal-success" id="stepSuccess"[^>]*>[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="modal-success" id="stepSuccess" style="display:none">
          <img src="logo-new.png" alt="by Luna Blossom" style="width:100px;margin:0 auto 0.5rem;display:block;">
                <div class="success-icon" style="font-size:2.5rem;margin-bottom:0.5rem">🌸</div>
                      <h3>Encomenda recebida!</h3>
                            <p style="margin-top:1rem">Vais receber um email com os dados de pagamento em breve.<br>Qualquer d\u00favida fala connosco no <a href="https://ig.me/m/by_luna_blossom" target="_blank" style="color:var(--gold)">@by_luna_blossom</a></p>
                                </div>`
  );

// Replace pink rose emoji with lilac flower emoji in success icon
html = html.replace(
    '<div class="success-icon" style="font-size:2.5rem;margin-bottom:0.5rem">\uD83C\uDF38</div>',
    '<div class="success-icon" style="font-size:2.5rem;margin-bottom:0.5rem">\uD83D\uDC9C</div>'
  );

// ── 9 & 15. Email: muda tagline e frases ──
// "joias com mensagem" -> "joias com intencao" in email body
// "Cada joia e uma declaracao" - already correct in site
// Change the email tagline below logo: "joias com mensagem" -> "Cada joia e uma declaracao"
// Change footer: remove Sofia, change tagline

// Fix email HTML - the Google Apps Script handles emails, so we update the template in the HTML
// that gets sent via the script. The email HTML is built in the Google Apps Script (server side).
// Here we update the submitEncomenda success message display and any client-side email references.

// ── 10. Footer do email: remove "Sofia" ──
// This is handled in the Google Apps Script

// ── Fix "joias com mensagem" -> "joias com intencao" everywhere in page ──
html = html.replace(/joias com mensagem/gi, 'j\u00f3ias com inten\u00e7\u00e3o');
html = html.replace(/J\u00f3ias com mensagem/g, 'J\u00f3ias com inten\u00e7\u00e3o');
html = html.replace(/JOIAS COM MENSAGEM/g, 'J\u00d3IAS COM INTEN\u00c7\u00c3O');

// Count changes
console.log('Done updating index.html');

fs.writeFileSync('index.html', html);
console.log('Saved!');
