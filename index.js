const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  const path = path.join('..', 'public', 'index.html')
  response.end(fileRider(path, (err , content) => {
    if(err){
      throw err;
    }
    const data = Buffer.from(content);
    return  data.toString();
  }));
});

const fileRider = fs.readFile(filePath, cb);

server.listen(30000, () => {
  console.log('Server has been started');
})
