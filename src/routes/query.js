module.exports = async function (fastify, options) {

  fastify.post('/query/:database', async (req, res) => {

    let output = await fastify.mongo
      .db(req.params.database)
      [req.body.method](...req.body.args);

    if (output.toArray !== undefined) {
      output = await output.toArray();
    };
    
    return { result: output };
  
  });

  fastify.post('/query/:database/:collection', async (req, res) => {

    let output = await fastify.mongo
      .db(req.params.database)
      .collection(req.params.collection)
      [req.body.method](...req.body.args);
    
    if (output.toArray !== undefined) {
      output = await output.toArray();
    }

    return { result: output };
  
  });

};