const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
function die(msg){
    console.error(msg);
    process.exit(1);
}
function run(cmd, show){
    console.log('>'+cmd);
    try {
        let stdio = undefined;
        if(show) stdio = 'inherit';
        let res = execSync(cmd, {stdio});
    }catch(err){
        die(err);
    }
}

let type = 'linux';


let configs = {

    linux:{
        cmd:"electron-builder build --linux --publish never",
        uploadExts: ['AppImage','7z'],
        uploadLatest: 'latest-linux.yml',
        uploadDir: path.join(__dirname, '../prod/')
    },

};

if(!configs[type]){
    die("Could not find target : "+type);
}


let config = configs[type];

console.log("Building package...");
run(config.cmd, true);
