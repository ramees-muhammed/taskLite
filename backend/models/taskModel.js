const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },  
    status: {
        type: String,
        enum: {
            values: ["To Do", "In Progress", "Done"],
            message: "Status must be either 'To Do', 'In Progress', or 'Done'",
        },
        default: "To Do",
    },
    priority: {
        type: String,
        enum: {
            values: ["Low", "Medium", "High"],
            message: "Priority must be either 'Low', 'Medium', or 'High'",
        },
        default: "Medium",
    },
    dueDate: {
        type: String,   // ISO format
        validate: {
            validator: function (v) {
                return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(v) || !v;
            },
            message: "Due date must be in valid ISO format (e.g., 2025-08-10T00:00:00.000Z)",
        },
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;