const app = require("express")();
const cors = require("cors");
const routes = require("./routes");
const clientController = require('./controller/clientController')

app.use(cors());

app.use('/', clientController)

routes.load(app);

app.listen(3000, () => {
  console.log(`Api running at ::3000`);
});
