
const { readFileSync } = require("fs");
const { resolve } = require("path");




exports.getProducts = function () {
  return JSON.parse(
    readFileSync(resolve(__dirname, "../data/product.json"), "utf8")
  );
};