module.exports = (err, req, res, next) => {
    console.log("server errorrrr", err.message);
    
    res.status(500).json({
        success: false,
        message: err.message
    });
};
