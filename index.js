const express = require("express");
const cors = require("cors");
const badges = require("./routes/badges");
const { config } = require("./config");

const app = express();

app.use(express.json());
app.use(cors());

// routes
badges(app);

app.get("/", (req, res) => {
  res.send("Hello word a API Bages Platzi");
});

app.listen(config.port, function() {
  console.log(`Listening http://localhost${config.port}`);
});
