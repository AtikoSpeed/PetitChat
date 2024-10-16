import https from "npm:https";
import fs from "npm:fs"

function httpsServer(app) {

  const SSLcert = {
    key: fs.readFileSync("/etc/letsencrypt/live/atakan.cloud/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/atakan.cloud/fullchain.pem"),
  };

  const httpsServer = https.createServer(SSLcert, app);
  return httpsServer;
}

export default httpsServer;