# Middy JSON API Error Handler

This is a [middy](https://middy.js.org/) middleware, which is formatting errors as error responses according to the [JSON:API spec](https://jsonapi.org/).

## Installation

```sh
npm install @joblocal/middy-json-api-error-handler
```

## Usage

```js
# handler.js
const middy = require('middy');
const jsonApiErrorHandler = require('@joblocal/middy-json-api-error-handler');

const yourHandler = () => {
  throw new Error('this will be formatted');
};

const handler = middy(yourHandler)
  .use(jsonApiErrorHandler());

module.exports = { handler };
```
