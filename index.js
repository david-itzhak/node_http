const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {

//   if (request.url === '/') {
//     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
//       if (err) {
//         throw err;
//       }
//       response.writeHead(200, {'Content-Type': 'text/html'});
//       response.end(data);
//     })
//   } else if (request.url === '/contact') {
//     fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, data) => {
//       if (err) {
//         throw err;
//       }
//       response.writeHead(200, {'Content-Type': 'text/html'});
//       response.end(data);
//     })
//   }

  let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    default:
      contentType = 'text/html';
  }
  if (ext === '.css') {
    contentType = ''
  }
  if (!ext) {
    filePath = filePath + '.html';
  }
  console.log("filePath", filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
        if (err) {
          // throw err;
          response.writeHead(500);
          response.end("Error");
        } else {
          response.writeHead(404, {'Content-Type': contentType});
          response.end(data);
        }
      })
    } else {
      response.writeHead(200, {'Content-Type': contentType});
      response.end(content);
    }
  })
});

const PORT = parseInt(process.env.PORT) || 30000;
server.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`);
});