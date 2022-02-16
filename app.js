const express = require("express");
const Router = require("./routes");
const { sequelize } = require("./models");

async function initialize() {
  const app = express();

  app.use(express.json());
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  app.use("/api", Router);

  await sequelize.sync();

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}

initialize();
