const fastifyPlugin = require('fastify-plugin')
const MongoClient = require('mongodb').MongoClient

module.exports = fastifyPlugin(async function (fastify, options) {
  const url = options.url
  delete options.url

  const db = await MongoClient.connect(url, options)
  fastify.decorate('mongo', db)
})