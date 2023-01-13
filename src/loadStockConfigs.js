const fs = require('fs');

function loadStockConfigs(){
    const allConfs = [];
    fs.readdirSync("./configs", "utf8").forEach((file) => {
        allConfs.push(fs.readFileSync("./configs/" + file, "utf8"));
      });

    return allConfs;
}

export default loadStockConfigs;
