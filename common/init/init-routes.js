const config = require('../config/config');
const healthCheck = require('../middleware/healthCheck');
const notFoundHandler = require('../middleware/notFoundHandler');
const errorHandler = require('../middleware/errorHandler');
// Route files
const dealsRoute = require('../../modules/deals/deal.routes');

/**
 * @function
 * Registers all app routes
 *
 * @param {object} app - Express app.
 * @param {object} server - Http server.
 */
module.exports = (app) => {
  // Mount routers
  app.get(`${config.baseUrl}/health/`, healthCheck);
  app.use(`${config.baseUrl}/deals/`, dealsRoute);

  // Handling Not Found
  app.use(notFoundHandler);

  // Central error handler
  app.use(errorHandler);
};
