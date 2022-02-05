const express = require("express");
const Router = require("./routes");
const { sequelize, Word } = require("./models");

async function initialize() {
  const app = express();

  app.use(express.json());
  app.use("/api", Router);

  await sequelize.sync();

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}

initialize();
