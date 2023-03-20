const { Router } = require("express");
const tempsRouter = Router();
const { getTempsHandler } = require("../handlers/tempsHandler");

tempsRouter.get("/", getTempsHandler);

module.exports = tempsRouter;
