const { Router } = require("express");
const dogRouter = Router();
const {
  getDogHandler,
  getDogIdHandler,
  createDogHandler,
} = require("../handlers/dogsHandler");

dogRouter.get("/", getDogHandler);

dogRouter.get("/:id", getDogIdHandler);

dogRouter.post("/", createDogHandler);

module.exports = dogRouter;
