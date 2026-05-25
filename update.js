const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix Instagram link in stepSuccess to go to DMs
// The link is: href="https://www.instagram.com/by_luna_blossom/"
html = html.replace(
  'href="https://www.instagram.com/by_luna_blossom/"',
  'href="https://ig.me/m/by_luna_blossom"'
);

// Count changes
const countIG = (html.match(/ig\.me\/m\/by_luna_blossom/g) || []).length;
console.log('Instagram DM links:', countIG);
console.log('Instagram profile links remaining:', (html.match(/www\.instagram\.com\/by_luna_blossom/g) || []).length);

fs.writeFileSync('index.html', html);
console.log('Done!');
