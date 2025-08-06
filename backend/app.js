const express = require("express");
const app = express();
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes")
const errorHandler = require("./middlewares/errorHandler");




app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,  // You can replace this with your frontend origin for better security,
    credentials: true
}));


app.use("/api/v1/tasks", taskRoutes);







app.use(errorHandler);



module.exports = app;