module.exports = require('fastify-plugin')(async function(fastify, options) {
  fastify.decorate('socket', require('socket.io')(fastify.server));
});
