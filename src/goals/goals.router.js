const router = require("express").Router();
const controller = require("./goals.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");
// const notFound = require("../errors/notFound");
// Helpers?

router
  .route("/")
  .get(controller.list)
  .post(controller.create);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy);


module.exports = router;
