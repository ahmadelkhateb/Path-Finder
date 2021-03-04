const conf = require('./swagger-conf');
const definitions = require('./definitions');
const { BearerAuth } = require('./security-schemes');
const docs = require('./docs');

const swaggerDocs = {
  ...conf,
  paths: {
    ...docs
  },
  components: {
    schemas: {
      ...definitions
    },
    securitySchemes: {
      BearerAuth
    }
  }
};
module.exports = swaggerDocs;
