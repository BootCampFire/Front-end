import { Express } from "express";
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: Express) {
  app.use(
    createProxyMiddleware("/games", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};