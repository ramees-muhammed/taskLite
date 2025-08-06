const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const validateRequest = require("../middlewares/validateRequest");
const { createTaskSchema, getTasksQuerySchema, updateTaskSchema } = require("../validations/taskValidator");
const router = express.Router();



router.route("/").post(validateRequest(createTaskSchema), createTask);
router.route("/").get(validateRequest(getTasksQuerySchema, "query"), getTasks);
router.route("/:id").put(validateRequest(updateTaskSchema), updateTask);
router.route("/:id").delete(deleteTask);






module.exports = router;