import App from './app';

// HTTPS CONFIGURE
import fs from 'fs';
import https from 'https';
import http from 'http';

const app = new App().application;

//const httpServer = http.createServer( app );
    
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url });
    res.end();
});

const httpsServer = https.createServer(
    {
        key: fs.readFileSync('/root/.acme.sh/woong-do.kro.kr/woong-do.kro.kr.key', 'utf-8'),
        cert: fs.readFileSync('/root/.acme.sh/woong-do.kro.kr/woong-do.kro.kr.cer', 'utf-8'),
        ca: fs.readFileSync('/root/.acme.sh/woong-do.kro.kr/ca.cer', 'utf-8'),
    },
    app
);

//app.listen( 80, ()=>{console.log(1)} );

httpServer.listen(80, () => {
    console.log('HTTP Server Start');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server Start');
});
