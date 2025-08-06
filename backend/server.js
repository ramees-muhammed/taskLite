const app = require("./app");
const dotenv = require("dotenv");
const databaseConnection = require("./config/databaseConnection");




dotenv.config({ path: "./config/config.env" }); // Load environment variables

databaseConnection();



const PORT = process.env.PORT;



app.listen(PORT, () => {
   console.log((`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`));

})