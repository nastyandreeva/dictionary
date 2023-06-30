const log = require('npmlog');
const app = require('./app');
const { host, port } = require('../../configs/api');

const webappName = "categories-api";

if (
  port === undefined ||
  port === null ||
  typeof port !== "number" ||
  isNaN(port) ||
  port <= 0
) {
  log.error(`[${webappName}] Invalid port: ${port}`);
  process.exit(1);
}

const server = app.listen(port, host);

async function stop() {
  log.info(`stopping [${webappName}]`);
  server.close(() => {
    log.info(`stopped [${webappName}]`);
    process.exit(0);
  });
}

log.info(`[${webappName}] starts on ${host}:${port}`);

process
  .on("uncaughtException", err => {
    log.error(`Uncaught exception: ${err.message}`);
    process.exit(1);
  })
  .on("unhandledRejection", reason => {
    log.error(`Unhandled Rejection at Promise:\n${reason.toString()}`);
    throw reason;
  })
  .on("SIGTERM", async () => stop())
  .on("SIGINT", async () => stop())
  .on("exit", async () => stop());
