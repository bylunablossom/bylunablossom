const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Idempotency check
if (html.includes('addPersonalizado(19)')) {
  console.log('Colar personalizado already added - skipping.');
  process.exit(0);
}

// Read the colar image and convert to base64
const colarImgBuffer = fs.readFileSync('colar.jpg');
const COLAR_IMG = 'data:image/jpeg;base64,' + colarImgBuffer.toString('base64');
console.log('Image loaded: ' + Math.round(COLAR_IMG.length/1024) + 'KB');

// ── 1. Add new MEDALHAS entry ──
const oldEnd = `ao mesmo tempo.'}
];`;
const newEnd = `ao mesmo tempo.'},
{img:'` + COLAR_IMG + `',nome:'Tell us your message!',mm:'personalizado',desc:'Grava a tua mensagem e usa-a ao pesco\u00e7o. A tua hist\u00f3ria, a tua voz, o teu colar.'}
];`;
if (!html.includes(oldEnd)) { console.error('ERROR: MEDALHAS closing not found'); process.exit(1); }
html = html.replace(oldEnd, newEnd);
console.log('1. MEDALHAS entry added');

// ── 2. Add card HTML after btn-18 ──
const btn18 = 'onclick="addToCart(18)" id="btn-18">+ Adicionar<\/button><\/div><\/div><\/div>';
const newCard = 'onclick="addToCart(18)" id="btn-18">+ Adicionar<\/button><\/div><\/div><\/div>' +
`\n<div class="card fade-in" id="card-19" style="border:2px solid #C4963A;position:relative;">\n` +
`<div style="position:absolute;top:10px;right:10px;background:#C4963A;color:white;font-size:10px;font-weight:bold;padding:3px 8px;border-radius:10px;letter-spacing:1px;z-index:2;">\u2736 PERSONALIZADO<\/div>\n` +
`<div class="card-img-wrap"><img src='` + COLAR_IMG + `' alt="colar personalizado" loading="lazy"><\/div>\n` +
`<div class="card-body">\n` +
`<div class="card-size-tag">Colar Personalizado - A\u00e7o<\/div>\n` +
`<div class="card-name">Tell us your message!<\/div>\n` +
`<div class="card-desc">Escreve a tua mensagem e usa-a ao pesco\u00e7o. M\u00e1ximo 25 caracteres.<\/div>\n` +
`<div class="color-selector"><span class="color-label">Escolhe a cor<\/span><div class="color-options">\n` +
`<button class="color-opt sel-gold" data-color="dourado" data-idx="19" onclick="selectColor(this)"><span class="dot dot-g"><\/span> Cor dourado<\/button>\n` +
`<button class="color-opt" data-color="prateado" data-idx="19" onclick="selectColor(this)"><span class="dot dot-s"><\/span> Cor prateado<\/button>\n` +
`<\/div><\/div>\n` +
`<div style="margin:12px 0;">\n` +
`<label style="font-size:12px;color:#666;font-weight:600;letter-spacing:0.5px;display:block;margin-bottom:6px;text-transform:uppercase;">A tua mensagem<\/label>\n` +
`<input type="text" id="msg-personalizada-19" maxlength="25" placeholder="Ex: Para sempre minha" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #C4963A;border-radius:8px;font-family:Georgia,serif;font-size:14px;color:#2C2C2C;background:#fffdf7;outline:none;" oninput="this.nextElementSibling.textContent=this.value.length+'/25'"/>\n` +
`<span style="font-size:11px;color:#999;display:block;text-align:right;margin-top:3px;">0/25<\/span>\n` +
`<\/div>\n` +
`<div class="card-footer">\n` +
`<div class="card-meta"><span class="card-price">22\u20AC<\/span><span class="card-ship">\u2736 Envio gratis<\/span><\/div>\n` +
`<button class="btn-add" onclick="addPersonalizado(19)" id="btn-19">+ Adicionar<\/button>\n` +
`<\/div><\/div><\/div>`;
if (!html.includes(btn18)) { console.error('ERROR: btn-18 pattern not found'); process.exit(1); }
html = html.replace(btn18, newCard);
console.log('2. Card HTML added');

// ── 3. Add addPersonalizado function before submitEncomenda ──
const submitFn = 'function submitEncomenda()';
const newFn = `function addPersonalizado(idx){
  var inputEl=document.getElementById('msg-personalizada-'+idx);
  var msg=inputEl?inputEl.value.trim():'';
  if(!msg){inputEl.style.border='2px solid #e44';inputEl.placeholder='Por favor escreve a tua mensagem!';inputEl.focus();return;}
  if(msg.length>25){inputEl.style.border='2px solid #e44';return;}
  inputEl.style.border='1px solid #C4963A';
  var m=MEDALHAS[idx];
  var silverBtn=document.querySelector('.color-opt.sel-silver[data-idx="'+idx+'"]');
  var cor=silverBtn?'prateado':'dourado';
  var msgKey='P: '+msg;
  var existing=cart.find(function(c){return c.idx===idx&&c.nome===msgKey&&c.cor===cor;});
  if(existing){existing.qty++;}
  else{cart.push({idx:idx,nome:msgKey,cor:cor,mm:'personalizado',img:m.img,qty:1,preco:22});}
  updateCartBadge();
  var btn=document.getElementById('btn-'+idx);
  var orig=btn.textContent;
  btn.textContent='\u2713 Adicionado!';
  btn.style.background='#2C6B2F';btn.style.color='white';btn.style.borderColor='#2C6B2F';
  setTimeout(function(){btn.textContent=orig;btn.style.background='';btn.style.color='';btn.style.borderColor='';},1500);
}
` + submitFn;
if (!html.includes(submitFn)) { console.error('ERROR: submitEncomenda not found'); process.exit(1); }
html = html.replace(submitFn, newFn);
console.log('3. addPersonalizado function added');

// ── 4. Price fix patch before </body> ──
const bodyClose = '<\/body>';
const pricePatch = `<script>
(function(){
  var _orig=window.renderCartItems;
  if(_orig)window.renderCartItems=function(){
    _orig.call(this);
    var items=document.querySelectorAll('.cart-item');
    cart.forEach(function(item,i){
      if(items[i]&&item.preco){var p=items[i].querySelector('.cart-item-price');if(p)p.textContent=item.preco+'\u20AC';}
    });
    var total=cart.reduce(function(s,it){return s+((it.preco||16)*it.qty);},0);
    var els=document.querySelectorAll('*');
    for(var i=0;i<els.length;i++){var el=els[i];if(!el.children.length&&el.textContent.trim().indexOf('Total:')===0){el.textContent='Total: '+total+'\u20AC';break;}}
  };
})();
<\/script>
<\/body>`;
html = html.replace('<\/body>', pricePatch);
console.log('4. Price patch added');

fs.writeFileSync('index.html', html);
console.log('Done! Colar personalizado added to index.html');
