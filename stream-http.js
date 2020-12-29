const http= require('http');
const fs= require('fs');
const path= require('path');

const server= http.createServer();



server.listen(3333,()=>{
    console.log(`Server listening at ${server.address().port}`);
});


server.on('request',(req,res)=>{
  const file= path.join(__dirname, 'bigfile','bigfile.js');
    switch(req.url) {
        case '/getfile-stream':
            const fsReadStream=fs.createReadStream(file);
            fsReadStream.pipe(res);
          break;
       
        case '/getfile':
          fs.readFile(file,(err,data)=>{
            if(err) console.log(err);
            res.write(data);
            res.end();
          })
          break;
        default:
          res.end('go to /fetfile to get the file');
      }
});