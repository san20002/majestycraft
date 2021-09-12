const { MCLaunch } = require('emc-core-luuxis');
const launcher = new MCLaunch();
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const { auth, config } = require('./assets/js/utils.js');

config.config().then(config => {

  if(["win32"].includes(process.platform)){
    var java = "/bin/java.exe"
  } else if(["darwin"].includes(process.platform)){
    console.log("mac")
    var java = "/Contents/Home/bin/java"
  } else if(["linux"].includes(process.platform)){
    console.log("linux")
    var java = "/bin/java"
  }
  if ((config.forge_version) == ""){
    var version = config.game_version
  } else {
    var version = config.forge_version
  }

  let opts = {
      url: config.game_url,
      overrides: {
          detached: false
      },
      authorization: auth.authenticator,
      root: dataDirectory + "/" + config.dataDirectory,
      javaPath: dataDirectory + "/" + config.dataDirectory + "/runtime/java/bin/java.exe",
      version: config.game_version,
      forge: "",
      checkFiles: true,
      memory: {
          max: "5G",
          min: "5G"
      }
  }

launcher.launch(opts);

launcher.on('debug', (e) => {console.log("[DEBUG]" + e)});
launcher.on('data', (e) => {console.log("[DATA]" + e)});
launcher.on('error', (e) => {console.log("[ERROR]" + e);});
launcher.on('verification-status', (e) => {console.log("[V\u00e9rification][emc-core-luuxis]: " + e.name + " (" + e.current + "/" + e.total + ")");});
launcher.on('download-status', (e) => {console.log("[DOWNLOAD][emc-core-luuxis]: [" + e.type + "] " + e.name + " (" + e.downloadedBytes + "/" + e.bytesToDownload + ")");});
})