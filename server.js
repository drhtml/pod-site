const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.use("/", express.static("dist/my-canary-ui"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, `dist/my-canary-ui/index.html`));
});

app.listen(port, () => {
  console.log("app is started and listening to the port: ", port);
});
