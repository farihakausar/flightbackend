const fs = require("fs");
const path = require("path");

const authRoutes = require("./authRoutes");

const categoryRoutes = require("./categoryRoutes");
const blogRoutes = require("./blogRoutes");
const loadAppRoutes = (app) => {
  const loadRoutes = (baseRoute, routesPath) => {
    const files = fs.readdirSync(routesPath).sort();
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        const routePath = path.join(routesPath, file);
        const route = require(routePath);
        const routeName = file.replace(".js", "");
        console.log(`/${baseRoute}/${routeName}`);
        app.use(`/${baseRoute}/${routeName}`, route);
      }
    });
  };

  // Load routes for authentication
  loadRoutes("v1", authRoutes);

  loadRoutes("v1", categoryRoutes);
  loadRoutes("v1", blogRoutes);
};

module.exports = {
  loadAppRoutes,
};
