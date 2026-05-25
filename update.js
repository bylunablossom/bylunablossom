const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update logo to use new logo file (no background)
html = html.replace(/<img([^>]*)class="hero-logo"([^>]*)>/g, '<img src="logo-new.png" alt="by Luna Blossom" class="hero-logo">');

// 2 & 14. Fix accents in Portuguese text on site
html = html.replace(/Tres palavras que toda a mulher ja precisou de dizer\. Usa ao pescoco e deixa a medalha falar por ti\./g, 'Três palavras que toda a mulher já precisou de dizer. Usa ao pescoço e deixa a medalha falar por ti.');
html = html.replace(/O teu espaco e sagrado\. Nao tens de o explicar\. Usa esta medalha e deixa que o mundo entenda\./g, 'O teu espaço é sagrado. Não tens de o explicar. Usa esta medalha e deixa que o mundo entenda.');
html = html.replace(/O teu corpo\. As tuas regras\. Sem negociacao, sem desculpas, sem explicacoes\./g, 'O teu corpo. As tuas regras. Sem negociação, sem desculpas, sem explicações.');
html = html.replace(/O teu rosto, as tuas emocoes\. Ninguem tem o direito de te dizer como te sentir\./g, 'O teu rosto, as tuas emoções. Ninguém tem o direito de te dizer como te sentir.');
html = html.replace(/Para a mulher que sabe o seu valor e nao aceita ser tratada como menos\./g, 'Para a mulher que sabe o seu valor e não aceita ser tratada como menos.');
html = html.replace(/Foca-te na tua vida - a minha esta muito bem tratada, obrigada\./g, 'Foca-te na tua vida — a minha está muito bem tratada, obrigada.');
html = html.replace(/Porque nao ha nada de radical em querer igualdade e respeito\. Feita com amor\. Usada com conviccao\./g, 'Porque não há nada de radical em querer igualdade e respeito. Feita com amor. Usada com convicção.');
html = html.replace(/Delicada por fora\. Imbativel por dentro\. Para a mulher que nao precisa de pedir permissao para brilhar\./g, 'Delicada por fora. Imbatível por dentro. Para a mulher que não precisa de pedir permissão para brilhar.');
html = html.replace(/O teu corpo, o teu espaco\. Limites claros, sem margem para duvidas\./g, 'O teu corpo, o teu espaço. Limites claros, sem margem para dúvidas.');
html = html.replace(/Porque a tua paciencia tem limites - e esta medalha avisa antes de os ultrapassares\./g, 'Porque a tua paciência tem limites — e esta medalha avisa antes de os ultrapassares.');
html = html.replace(/Nao pediste a opiniao de ninguem - e esta medalha garante que toda a gente sabe\./g, 'Não pediste a opinião de ninguém — e esta medalha garante que toda a gente sabe.');
html = html.replace(/Para a mulher que ja percebeu que a opiniao dos outros nao vale o tempo\./g, 'Para a mulher que já percebeu que a opinião dos outros não vale o tempo.');
html = html.replace(/Sair sem pedir desculpa\. A declaracao mais libertadora que podes usar ao pescoco\./g, 'Sair sem pedir desculpa. A declaração mais libertadora que podes usar ao pescoço.');
html = html.replace(/Para quando ja nao tens paciencia para explicar o obvio\./g, 'Para quando já não tens paciência para explicar o óbvio.');
html = html.replace(/A versao mais discreta - mesma atitude, tamanho menor\./g, 'A versão mais discreta — mesma atitude, tamanho menor.');
html = html.replace(/Forca e delicadeza na mesma peca\. Porque podes ser guerreira e poetica ao mesmo tempo\./g, 'Força e delicadeza na mesma peça. Porque podes ser guerreira e poética ao mesmo tempo.');
html = html.replace(/Para a mulher que define os seus limites sem pedir desculpa\./g, 'Para a mulher que define os seus limites sem pedir desculpa.');
html = html.replace(/Criadas em Portugal, com atitude\. Porque uma mulher que sabe o que quer merece uma joia que o diga em voz alta\./g, 'Criadas em Portugal, com atitude. Porque uma mulher que sabe o que quer merece uma jóia que o diga em voz alta.');

// Fix "Envio gratis" -> "Envio grátis" (multiple patterns)
html = html.replace(/Envio gratis/g, 'Envio grátis');

// 5 & 15. Replace taglines  
html = html.replace(/joias com mensagem/gi, 'jóias com intenção');
html = html.replace(/JOIAS COM MENSAGEM/g, 'JÓIAS COM INTENÇÃO');

// 7. Replace flowers with moon/stars in success modal
html = html.replace(/<div class="success-icon">[^<]*<\/div>/, '<div class="success-icon">✨🌙✨<\/div>');

// 8. Fix Instagram link to direct messages in success modal only
html = html.replace(/(<div id="stepSuccess"[^>]*>[\s\S]*?href=")https:\/\/www\.instagram\.com\/by_luna_blossom\/(")/,
  '$1https://ig.me/m/by_luna_blossom$2');

// 9 & 10. Update email content - tagline under logo in email template
html = html.replace(/joias com mensagem\./g, 'jóias com intenção.');

// 10. Remove Sofia from footer email
html = html.replace(/Com carinho, Sofia/g, 'Com carinho,');

// Footer Instagram link - NOT changing the header/nav links to DMs, only stepSuccess
// (the footer @by_luna_blossom link to profile is fine)

console.log('All changes applied. Size:', html.length, 'bytes');
fs.writeFileSync('index.html', html);
console.log('File saved successfully!');
