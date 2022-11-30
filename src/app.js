const express = require("express");
const app = express();
const cors = require("cors");
const devnet = require('devnet-js');
const bodyParser = require('body-parser');

let ciscodev1 = new devnet.Defaultclass({ id:"any string here" });

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.put('/ssh', (req, res) => {
    console.log(req.body.data);
    // var loginparam = {
    //         credential:{  //see ssh2 documentation for other option
    //             host: '10.69.1.200',
    //             port: 22,
    //             username: 'admin',
    //             password: 'Lun@R4ck65$!',
    //             algorithms: {
    //                 cipher: [ '3des-cbc' ],
    //                 kex: [ "diffie-hellman-group1-sha1" ]
    //               }
    //         }
    //       }
    //     ciscodev1.openSshShell(loginparam, function(stream){
    //       if(stream){   // stream instance
    //         console.log('Session Ready');
    //         stream.on('close', function() {
    //           console.log('Stream :: close');
    //           ciscodev1.sshconn.end();
    //         }).on('data', function(data) {
    //           // console.log('OUTPUT: ' + data);
    //         });
    //         // stream.end('dir\nexit\n');
    //       }
    //     });
        
    //     setTimeout(function(){ //Writing stream in a simple way some delay is required none common method; moments after openSshShell function.
    //       ciscodev1.streamSendkeys(`en\rLun@R4ck65$!\rconf t\r`,{autoenter:true,emit:true}).on('data',function(data) {  //other style
    //         process.stdout.write(data);
    //       });
    //     }, 6000);
        
    //     setTimeout(function(){  //terminate ssh session after 12 seconds
    //         ciscodev1.end();
    //       }, 12000);
});

module.exports = app;