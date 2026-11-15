import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 4201);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.woff2':'font/woff2' };

http.createServer(async (request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,`http://${request.headers.host}`).pathname);
  const relative=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
  let target=path.resolve(root,relative);
  if(!target.startsWith(root)){response.writeHead(403).end('Forbidden');return}
  try{const body=await fs.readFile(target);response.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'}).end(body)}
  catch{const body=await fs.readFile(path.join(root,'index.html'));response.writeHead(200,{'Content-Type':types['.html']}).end(body)}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
