const router = require("express").Router();
const controller = require("./users.controller");


router
  .route("/")
  .get(controller.list)
  .post(controller.create);

router
  .route("/goals")
  .get(controller.listUsersWithGoals);

router
  .route("/:id/goals")
  .get(controller.listGoalsForUser)
  .post(controller.createGoalForUser);

router
  .route("/:id")
  .get(controller.read)
  .patch(controller.update)
  .delete(controller.destroy);



module.exports = router;
