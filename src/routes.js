module.exports.load = (app) => {
  app.get("/", (req, res, next) => {});  

  app.get("/name/:name", (req, res, next) => {});
  
  app.get("/:client_id/totals", (req, res, next) => {});  

  app.get("/enterprise", (req, res, next) => {});

  app.get("/enterprise/name/:name", (req, res, next) => {});

  app.get("/:client_id/enterprise", (req, res, next) => {});

  app.get("/:client_id/enterprise/name/:name", (req, res, next) => {});

  /** Get general totals */
  app.get("/totals", (req, res, next) => {});

  app.get("/:_id", (req, res, next) => {});
};
