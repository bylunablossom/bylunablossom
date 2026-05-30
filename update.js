const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── 1. Fix Instagram DM link ──
html = html.replace(
                  'href="https://www.instagram.com/by_luna_blossom/"',
                  'href="https://ig.me/m/by_luna_blossom"'
          );

// ── 2. POPUP "Encomenda Recebida": sem flor, com logo sem fundo ──
html = html.replace(
                  /<div class="modal-success" id="stepSuccess"[^>]*>[\s\S]*?<\/div>\s*<\/div>/,
                  `<div class="modal-success" id="stepSuccess" style="display:none">
                  <img src="logo-new.png" alt="by Luna Blossom" style="width:100px;margin:0 auto 0.5rem;display:block;">
                  <h3>Encomenda recebida!</h3>
                  <p style="margin-top:1rem">Vais receber um email com os dados de pagamento em breve.<br>Qualquer d\u00favida fala connosco no <a href="https://ig.me/m/by_luna_blossom" target="_blank" style="color:var(--gold)">@by_luna_blossom</a></p>
                  </div>`
          );

// Also remove any leftover flower emoji in the success icon (legacy)
html = html.replace(/<div class="success-icon"[^>]*>[\s\S]*?<\/div>/, '');

// ── 3. Fix "joias com mensagem" -> "joias com intencao" everywhere in page ──
html = html.replace(/joias com mensagem/gi, 'j\u00f3ias com inten\u00e7\u00e3o');
html = html.replace(/J\u00f3ias com mensagem/g, 'J\u00f3ias com inten\u00e7\u00e3o');
html = html.replace(/JOIAS COM MENSAGEM/g, 'J\u00d3IAS COM INTEN\u00c7\u00c3O');

// ── 4. Politica de privacidade: checkbox centrado antes do botao (idempotente) ──
// Substituir o bloco completo do checkbox antigo (se existir) por um novo centrado
// Padrao especifico para o checkbox antigo com margin:12px 0;font-size:13px
html = html.replace(
                  /<div style="margin:12px 0;font-size:13px;color:#555;">\s*<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;">\s*<input type="checkbox" id="privacyCheck"[^>]*\/>\s*<span>[\s\S]*?<\/span>\s*<\/label>\s*<\/div>/g,
                  ''
          );
// Substituir o novo checkbox (se ja existir com o estilo centrado) por nada para evitar duplicados
html = html.replace(
                  /<div style="margin:12px 0;font-size:13px;color:#555;display:flex;justify-content:center;">\s*<label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;">\s*<input type="checkbox" id="privacyCheck"[^>]*\/>\s*<span>[\s\S]*?<\/span>\s*<\/label>\s*<\/div>/g,
                  ''
          );
// Adicionar checkbox centrado antes do botao de submissao
html = html.replace(
                  /(<button[^>]*id="btnSubmit"[^>]*>|<button[^>]*type="submit"[^>]*class="[^"]*btn-submit[^"]*"[^>]*>)/,
                  `<div style="margin:12px 0;font-size:13px;color:#555;display:flex;justify-content:center;">
                  <label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
                  <input type="checkbox" id="privacyCheck" required style="margin:0;accent-color:#C4963A;width:14px;height:14px;flex-shrink:0;" />
                  <span>Li e aceito a <a href="privacidade.html" target="_blank" style="color:#C4963A;text-decoration:underline;">Pol\u00edtica de Privacidade e Devolu\u00e7\u00f5es</a></span>
                  </label>
                  </div>
                  $1`
          );

// ── 5. Fix hero logo size - limitar largura ao titulo ──
html = html.replace(
                  /<img src="logo-new\.png" alt="by Luna Blossom" class="hero-logo"[^>]*>/,
                  '<img src="logo-new.png" alt="by Luna Blossom" class="hero-logo" style="width:clamp(180px,28vw,280px);height:auto;display:block;margin:0 auto 1rem;">'
          );

// ── 6. Remove flor rosa do titulo da modal de confirmacao (Obrigada!) ──
html = html.replace(
                  /document\.getElementById\('modalTitle'\)\.textContent\s*=\s*'Obrigada!\s*\u{1F338}'/u,
                  "document.getElementById('modalTitle').textContent = 'Obrigada!'"
          );
html = html.replace(
                  "document.getElementById('modalTitle').textContent = 'Obrigada! \uD83C\uDF38'",
                  "document.getElementById('modalTitle').textContent = 'Obrigada!'"
          );

// ── 7. Cria pagina de politica de privacidade ──
const privacyHtml = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pol\u00edtica de Privacidade e Devolu\u00e7\u00f5es - by Luna Blossom</title>
<style>
body { font-family: Georgia, serif; max-width: 680px; margin: 40px auto; padding: 20px; color: #333; line-height: 1.7; }
h1 { color: #1a2e1a; font-size: 1.4rem; border-bottom: 1px solid #C4963A; padding-bottom: 8px; }
h2 { color: #C4963A; font-size: 1rem; margin-top: 28px; }
a { color: #C4963A; }
footer { margin-top: 40px; font-size: 12px; color: #888; text-align: center; }
</style>
</head>
<body>
<h1>Pol\u00edtica de Privacidade e Devolu\u00e7\u00f5es</h1>
<p><em>by Luna Blossom</em></p>
<h2>1. Dados Pessoais</h2>
<p>Os teus dados pessoais (nome, email, morada e telefone) s\u00e3o recolhidos exclusivamente para o processamento e envio da tua encomenda. N\u00e3o s\u00e3o partilhados com terceiros para fins comerciais.</p>
<h2>2. Reten\u00e7\u00e3o de Dados</h2>
<p>Os teus dados ser\u00e3o eliminados ao fim de 6 meses ap\u00f3s a concretiza\u00e7\u00e3o da encomenda.</p>
<h2>3. Direitos do Utilizador</h2>
<p>Tens direito a aceder, corrigir ou solicitar a elimina\u00e7\u00e3o dos teus dados a qualquer momento, contactando-nos atrav\u00e9s do Instagram <a href="https://ig.me/m/by_luna_blossom" target="_blank">@by_luna_blossom</a>.</p>
<h2>4. Devolu\u00e7\u00f5es</h2>
<p>Dado o car\u00e1ter personalizado e artesanal das nossas pe\u00e7as, n\u00e3o aceitamos devolu\u00e7\u00f5es salvo em caso de defeito de fabrico. Em caso de produto com defeito, contacta-nos no prazo de 48h ap\u00f3s a recebi\u00e7\u00e3o da encomenda.</p>
<p>Os custos de devolu\u00e7\u00e3o s\u00e3o da responsabilidade do comprador.</p>
<h2>5. Contacto</h2>
<p>Para qualquer quest\u00e3o relacionada com a tua encomenda ou dados pessoais, fala connosco no Instagram: <a href="https://ig.me/m/by_luna_blossom" target="_blank">@by_luna_blossom</a></p>
<footer>&copy; by Luna Blossom &mdash; j\u00f3ias com inten\u00e7\u00e3o, feitas em Portugal</footer>
</body>
</html>`;

fs.writeFileSync('privacidade.html', privacyHtml);

// ── 8. Preço 13€ para medalhas 15mm (Fuck you 15mm e Hand and Flower 15mm) ──
html = html.replace(
  'card-price">16€</span><span class="card-ship">✶ Envio gratis</span></div><button class="btn-add" onclick="addToCart(17)"',
  'card-price">13€</span><span class="card-ship">✶ Envio gratis</span></div><button class="btn-add" onclick="addToCart(17)"'
);
html = html.replace(
  'card-price">16€</span><span class="card-ship">✶ Envio gratis</span></div><button class="btn-add" onclick="addToCart(18)"',
  'card-price">13€</span><span class="card-ship">✶ Envio gratis</span></div><button class="btn-add" onclick="addToCart(18)"'
);

// ── 9. Privacidade - cláusula peças personalizadas não devolvidas ──
let privHtml2 = fs.readFileSync('privacidade.html', 'utf8');
privHtml2 = privHtml2.replace(
  '<p>Os custos de devolução são da responsabilidade do comprador.</p>',
  '<p style="background:#fff8ef;border-left:3px solid #C4963A;padding:10px 14px;margin:12px 0;border-radius:0 6px 6px 0;"><strong>Peças personalizadas:</strong> As peças com gravação personalizada são produzidas exclusivamente para cada cliente e <strong>não podem ser devolvidas nem trocadas.</strong></p>\n<p>Os custos de devolução são da responsabilidade do comprador.</p>'
);
fs.writeFileSync('privacidade.html', privHtml2);

fs.writeFileSync('index.html', html);
console.log('Done! index.html e privacidade.html actualizados.');
