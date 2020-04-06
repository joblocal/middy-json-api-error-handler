const Sentry = require('@sentry/node');

module.exports = () => ({
  onError(handler, next) {
    if (handler.error.statusCode && handler.error.message) {
        const errorResponse = (errorObject) => JSON.stringify({
            errors: [errorObject],
        });

        const body = (typeof handler.error.message === 'string') ?  errorResponse({
            title: handler.error.message,
          }) : errorResponse(handler.error.message);

        handler.response = {
            statusCode: handler.error.statusCode,
            body,
        };

        return next();
    }

    return next(handler.error);
  },
});
