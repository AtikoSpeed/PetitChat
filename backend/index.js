import app from "./server.js";
import httpsServer from "./https.js";
const port = 3000;

httpsServer(app).listen(port, () => {
  console.log(`Server is running on https://atakan.tech:${port}/`);
});
