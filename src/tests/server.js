import { rest } from "msw";
import { setupServer } from "msw/node";

const createServer = (handleConfigs) => {
  const handlers = handleConfigs.map((config) => {
    return rest[config.meathod || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });
  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
};

export { createServer };
