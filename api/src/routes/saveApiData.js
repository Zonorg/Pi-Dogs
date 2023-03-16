const { Router } = require("express");
const router = Router();
const { API_KEY } = process.env;

const api = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
