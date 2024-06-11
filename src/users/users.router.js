const router = require("express").Router();
const controller = require("./users.controller");


router
  .route("/")
  .get(controller.list)
  .post(controller.create);

router
  .route("/:id")
  .get(controller.read)
  .patch(controller.update)
  .delete(controller.destroy);

router
  .route("/:id/goals")
  .post(controller.createGoalForUser);

module.exports = router;
