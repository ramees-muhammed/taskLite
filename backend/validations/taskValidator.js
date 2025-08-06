const Joi = require("joi");

exports.createTaskSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required.",
    "any.required": "Title is required."
  }),
  description: Joi.string().trim().allow(""),
  status: Joi.string().valid("To Do", "In Progress", "Done").optional().messages({
    "any.only": "Status must be either 'To Do', 'In Progress', or 'Done'"
  }),
  priority: Joi.string().valid("Low", "Medium", "High").optional().messages({
    "any.only": "Priority must be either 'Low', 'Medium', or 'High'"
  }),
  dueDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    .optional()
    .messages({
      "string.pattern.base": "Due date must be in ISO format (e.g., 2025-08-10T00:00:00.000Z)"
    }),
});

exports.getTasksQuerySchema = Joi.object({
  status: Joi.string().valid("To Do", "In Progress", "Done").optional(),
  priority: Joi.string().valid("Low", "Medium", "High").optional(),
  search: Joi.string().optional(),
  sortBy: Joi.string().valid("title", "createdAt", "dueDate", "priority", "status").optional(),
  order: Joi.string().valid("asc", "desc").optional(),
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).max(100).optional().default(10),
});

exports.updateTaskSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().allow("").optional(),
  status: Joi.string().valid("To Do", "In Progress", "Done").optional(),
  priority: Joi.string().valid("Low", "Medium", "High").optional(),
  dueDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    .optional()
    .messages({
      "string.pattern.base": "Due date must be in ISO format (e.g., 2025-08-10T00:00:00.000Z)"
    }),
});
