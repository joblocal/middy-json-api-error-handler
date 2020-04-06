const jsonApiErrorHandler = require('./');

test('to format error string as JSON API error', () => {
  const handler = {
    error: {
      statusCode: 500,
      message: 'error message',
    },
  };
  const next = jest.fn();

  jsonApiErrorHandler().onError(handler, next);

  expect(handler.response.statusCode).toBe(500);
  expect(handler.response.body).toBe(JSON.stringify({
    errors: [{
      title: 'error message',
    }],
  }));
  expect(next).toHaveBeenCalled();
});

test('to format error string as JSON API error', () => {
  const handler = {
    error: {
      statusCode: 422,
      message: {
        title: 'error message',
        detail: 'detail message',
      },
    },
  };
  const next = jest.fn();

  jsonApiErrorHandler().onError(handler, next);

  expect(handler.response.statusCode).toBe(422);
  expect(handler.response.body).toBe(JSON.stringify({
    errors: [{
      title: 'error message',
      detail: 'detail message',
    }],
  }));
  expect(next).toHaveBeenCalled();
});

