const ss = require('socket.io-stream')
const {user, password} = require('../../.auth.json')

module.exports = async function (fastify, options) {
  fastify.socket.on('connection', (socket) => {

    ss(socket).on('stream', (stream) => {

      const proc = fastify.spawn('mongo', ['-u', user, '-p', password, '--authenticationDatabase', 'admin'], {
        name: 'xterm-color',
        cwd: process.env.HOME,
        env: process.env,
      })

      stream.on('error', ({ message }) => {
        console.log('error while streaming:', message);
        proc.kill();
      });

      const dd = proc.onData((data) => stream.write(data));

      const ed = proc.onExit(() => {
        dd.dispose();
        ed.dispose();
      });

      stream.on('data', (data) => proc.write(data.toString()));
      stream.on('close', () => (proc.kill !== undefined) && proc.kill())

    });

  });

}
