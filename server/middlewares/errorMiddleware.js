const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'An unexpected error occurred',
    });
};

module.exports = errorMiddleware;
