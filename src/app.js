const express = require("express");
const app = express();
const cors = require("cors");
const devnet = require('devnet-js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.put('/ssh', (req, res) => {
    let c = 0;
    const { username, password, config, queue } = req.body.data;
    while(c < queue.length){

    // console.log(queue)
    console.log(queue[0]);
    //a loop that tunnels into each device listed in queue, attach username, password
    var loginparam = {
        credential: {  //see ssh2 documentation for other option
            host: queue[c],
            port: 22,
            username: username,
            password: password,
            algorithms: {
                cipher: ['3des-cbc'],
                kex: ["diffie-hellman-group1-sha1"]
            }
        }
    }
    let ciscodev1 = new devnet.CiscoRouter({ id: "sample-id-1" });

    ciscodev1.openSshShell(loginparam, function (stream) {  // interactive shell
        if (stream) {   // stream instance
            console.log('Session Ready');
            stream.on('data', function (data) {
                console.log('OUTPUT: ' + data);
            })
        }
    });

    ciscodev1.openSshShell(loginparam);

    setTimeout(function(){ //Writing stream in a simple way some delay is required none common method; moments after openSshShell function.
      ciscodev1.streamSendkeys(`en\r${password}\rsh run\r`,{autoenter:true,emit:true}).on('data',function(data) {  //other style
        process.stdout.write(data);
      });
    }, 3000);
    setTimeout(function(){  //terminate ssh session after 12 seconds
        ciscodev1.end();
      }, 20000);
    c++;
    console.log(c)
    }
});

module.exports = app;