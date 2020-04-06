const Sentry = require('@sentry/node');
const JSONAPIError = require('jsonapi-serializer').Error;

module.exports = () => ({
  onError(handler, next) {
    if (handler.error.statusCode && handler.error.message) {
        const errors = (typeof handler.error.message === 'string') ?  new JSONAPIError({
          title: handler.error.message,
        }) : new JSONAPIError(handler.error.message);

        handler.response = {
            statusCode: handler.error.statusCode,
            body: JSON.stringify(errors),
        };

        return next();
    }

    return next(handler.error);
  },
});
