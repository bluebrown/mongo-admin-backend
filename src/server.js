const fastify = require('fastify')({ logger: true })
const {user, password} = require('../.auth.json')
const path = require('path')

fastify.register(require('fastify-cors'), { 
  origin: 'http://localhost:5000'
})

fastify.addContentTypeParser(
  'application/x-www-form-urlencoded', 
  function (req, done) {
    done()
  }
)

fastify.register(require('./plugins/spawn'))

fastify.register(require('./plugins/mongo'), {
  url: 'mongodb://localhost:27017/',
  user: user,
  password: password
})

fastify.register(require('./plugins/socket'))

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '..', 'public'),
})

const opts = { prefix: '/api/v0' }
fastify.register(require('./routes/query'), opts)
fastify.register(require('./routes/load'), opts)
fastify.register(require('./routes/socket'), opts)

  ;
(async () => {
  await fastify.listen(7020)
})().catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})