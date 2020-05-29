// const parse = require('mongodb-query-parser');
const { user, password } = require('../.auth.json');
const { createWriteStream } = require('fs');
const { promisify } = require('util');
const { exec } = require('child_process');
const { pipeline } = require('stream');

const run = promisify(exec);
const pipe = promisify(pipeline);

const command = `mongo -u '${user}' -p '${password}' \
  --authenticationDatabase admin /data/db/query.js | tail -n +5`

const parseStdout = (text) => {
  return { raw: text };
};

module.exports = async function (fastify, options) {
  fastify.post('/load', async (req, res) => {
    await pipe(req.req, createWriteStream('/data/db/query.js'));
    const { stdout } = await run(command);
    return { result: parseStdout(stdout) }
  });

}