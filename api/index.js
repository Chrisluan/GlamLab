// api/index.js

const app = require('../server.js'); // importa o app que você já exportou

module.exports = (req, res) => {
  return app(req, res); // Vercel injeta req e res aqui
};
