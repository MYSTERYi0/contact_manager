const {constants} = require("../routes/constants") // {} around var name is used to destructure: meaning

const errorHandler = (err, req, res, next) => { // what passes in the err req res
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
            title: "Validation Failed",
            message: err.message,
            stackTrace: err.stack
        });
        break;

        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });

        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorised",
                message: err.message,
                stackTrace: err.stack,
            });

        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden error",
                message: err.message,
                stackTrace: err.stack,
            });

        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
        default:
            console.log("No Error, All good");
            break;
    }
    res.json({message: err.message, stackTrace: err.stack})
};

module.exports = errorHandler;