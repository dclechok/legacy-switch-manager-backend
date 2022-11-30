const fs = require('fs');
//joining path of directory 
// const directoryPath = path.join('./', 'configs');
//passsing directoryPath and callback function
const allConfs = [];
fs.readdirSync("./configs", "utf8").forEach((file) => {
    allConfs.push(fs.readFileSync("./configs/" + file, "utf8"));
  });

  console.log(allConfs[1])