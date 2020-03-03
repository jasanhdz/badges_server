const express = require("express");
const cors = require("cors");
const badges = require("./routes/badges");
const { config } = require("./config");

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require("./utils/middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());

// routes
badges(app);

// Los middlewares de error, siempre tienen que ir al final de las rutas,
// las rutas también son middlewares
// **Menejadores de errores**
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello word a API Bages Platzi");
});

app.listen(config.port, function() {
  console.log(`Listening http://localhost${config.port}`);
});
