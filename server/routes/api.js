module.exports = server => {
    server.route({
        method: 'GET',
        path: '/test',
        handler:  (req, reply) => {
            return ({"popa":"popa",
        "kaka":[1,2,3,4]})
        }
      });
};
