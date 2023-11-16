function errorHandler(err, req, res, next) {
    switch (err.name) {
        case "InvalidInput":
            return res.status(400).json({ message: "Invalid Input" });
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            return res.status(400).json({ message: err.errors[0].message });
        case "Unauthorized":
            return res.status(401).json({ message: err.message });
        case "notFound":
            return res.status(404).json({ message: err.message });

        default:
            return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = errorHandler;