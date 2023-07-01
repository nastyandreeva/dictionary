/**
 * Generate a random free port
 * @return {number}
 */
function randomPort() {
  return Math.floor(Math.random() * (65535 - 1024)) + 1024;
}

/**
 * Start an HTTP server
 * @param {Application} app - Koa app
 * @param {string=} host - Predefined app host, if any
 * @param {number=} port - Predefined app port, if any
 * @return {Server} - Node.js HTTP server
 */
function startServer(app, host, port) {
  return app.listen(port || randomPort(), host || 'localhost');
}

module.exports = {
  startServer,
};
