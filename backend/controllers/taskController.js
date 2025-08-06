const { default: mongoose } = require("mongoose");
const Task = require("../models/taskModel");


exports.createTask = async (req, res) => {
    console.log("hhhhh");
    
    try {
        console.log("req.bodyyyy", req.body);
        const { title, description, status, priority, dueDate } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required."
            });
        }

        const task = await Task.create({
            title: title.trim(),
            description: description?.trim() || "",
            status,
            priority,
            dueDate,
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { status, priority, search, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;
        const query = {};

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) {
            query.title = { $regex: search, $options: "i" }; // case-insensitive search
        };
        const skip = (page - 1) * limit;
        const tasks = await Task.find(query)
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(Number(limit));

        if (!tasks) {
            return res.status(404).json({
                success: false,
                message: "Tasks not found"
            });
        }
        const totalTasks = await Task.countDocuments(query);

        return res.status(200).json({
            success: true,
            total: totalTasks,
            page: Number(page),
            limit: Number(limit),
            tasks
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID format",
            });
        }

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}