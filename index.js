import app from "./server.js";
import httpsServer from "./https.js";
const port = 3000;

httpsServer(app).listen(port, () => {
  console.log(`Server is running on http://188.132.234.81:${port}/`);
});
