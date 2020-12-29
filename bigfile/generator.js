const fs= require('fs');
const path= require('path');
const EOL= require('os').EOL;

const file= path.join(__dirname, 'bigfile.js');

const filewriter=fs.createWriteStream(file);



    for(let i=0;i<1e6; i++){
        filewriter.write(`Hi this is line ${i} ${EOL}`,(err)=>{
            if(err) console.log(err);
        })
    }
