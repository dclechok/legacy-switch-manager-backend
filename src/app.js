// const stock2960 = require('../src/configs/stock-2960.txt');
const express = require("express");
const app = express();
const cors = require("cors");
var devnet = require('devnet-js');
let ciscodev1 = new devnet.Defaultclass({ id:"any string here" });

const fs = require('fs')
  
// Reading data in utf-8 format
// which is a type of character set.
// Instead of 'utf-8' it can be 
// other character set also like 'ascii'
let config = '';
fs.readFile('./src/configs/stock-2960.txt', 'utf-8', (err, data) => {
    if (err) throw err;
  
    // Converting Raw Buffer to text
    // data using tostring function.
    config = data;
})

// fs.close();

app.use(cors());

app.use(express.json());

app.get('/ssh', (req, res) => {
    // console.log(req.body);
    var loginparam = {
            credential:{  //see ssh2 documentation for other option
                host: '10.69.1.200',
                port: 22,
                username: 'admin',
                password: 'Lun@R4ck65$!',
                algorithms: {
                    cipher: [ '3des-cbc' ],
                    kex: [ "diffie-hellman-group1-sha1" ]
                  }
            }
          }
        ciscodev1.openSshShell(loginparam, function(stream){
          if(stream){   // stream instance
            console.log('Session Ready');
            stream.on('close', function() {
              console.log('Stream :: close');
              ciscodev1.sshconn.end();
            }).on('data', function(data) {
              // console.log('OUTPUT: ' + data);
            });
            // stream.end('dir\nexit\n');
          }
        });
        
        setTimeout(function(){ //Writing stream in a simple way some delay is required none common method; moments after openSshShell function.
          ciscodev1.streamSendkeys(`en\rLun@R4ck65$!\rconf t\r${config}`,{autoenter:true,emit:true}).on('data',function(data) {  //other style
            process.stdout.write(data);
          });
        }, 6000);
        
        setTimeout(function(){  //terminate ssh session after 12 seconds
            ciscodev1.end();
          }, 12000);
});

module.exports = app;