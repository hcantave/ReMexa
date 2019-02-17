const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth", { target: "http://localhost:5000" }));
  app.use(proxy("/transfer", { target: "http://localhost:5000" }));
  app.use(proxy("/GOD", { target: "http://localhost:5000" }));
};
