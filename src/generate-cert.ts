import * as fs from 'fs';
import * as selfsigned from 'selfsigned';

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });

fs.writeFileSync('cert.pem', pems.cert);
fs.writeFileSync('key.pem', pems.private);
console.log('Certyfikat i klucz wygenerowane!')