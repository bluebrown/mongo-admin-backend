const fastifyPlugin = require('fastify-plugin')
const pty = require('node-pty')

module.exports = fastifyPlugin(async function (fastify, options) {
  fastify.decorate('spawn', pty.spawn)
})