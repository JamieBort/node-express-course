const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // See https://expressjs.com/en/guide/error-handling.html#the-default-error-handler. Specifically, see
            // If you pass an error to next() and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace. The stack trace is not included in the production environment.
            next(error);
        }
    };
};

module.exports = asyncWrapper;