# dev-folio

Portfolios for developers done right

```bash
certbot certonly --manual --key-type rsa
cd /etc/letsencrypt/live/dev-folio.com
openssl rsa -in ./privkey.pem -out ./privkey.pem.rsa.key -traditional
cat privkey.pem.rsa.key | pbcopy
cat fullchain.pem | pbcopy
```
