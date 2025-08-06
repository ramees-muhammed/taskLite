const mongoose = require("mongoose");



const databaseConnection = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.DB_URI);

        
        console.log(`✅ Database connected with ${dbConnection.connection.host}`);


    } catch (err) {
        console.error(`Database connection error ${err}`);
        process.exit(1);      // ensures the app stops if DB connection fails.
    }
}


module.exports = databaseConnection;





