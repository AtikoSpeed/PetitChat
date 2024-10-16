import https from "https";
import fs from "fs"

function httpsServer(app) {

  const SSLcert = {
    key: fs.readFileSync("/etc/letsencrypt/live/atakan.tech/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/atakan.tech/fullchain.pem"),
  };

  const httpsServer = https.createServer(SSLcert, app);
  return httpsServer;
}

export default httpsServer;