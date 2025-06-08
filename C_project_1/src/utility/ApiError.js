class ApiError extends Error {
    constructor(statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.data = null
        this.success = false
        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export {ApiError}

/*

## 🛑 What is `ApiError`?

`ApiError` is a **custom error class** that extends the built-in `Error` class in JavaScript. It allows you to:

* Add custom **HTTP status codes**, **error messages**, and **optional metadata**.
* Throw errors in a consistent format.
* Catch and respond with meaningful error info using middleware.

---

## 🔧 Example: `ApiError` Class

```javascript
// utils/ApiError.js

class ApiError extends Error {
  constructor(message, statusCode = 500, errorCode = null, stack = '') {
    super(message); // built-in Error property
    this.statusCode = statusCode;
    this.errorCode = errorCode || 'ERR_INTERNAL_SERVER';
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
```

---

## ✅ How to Use `ApiError`

You can **throw** it from any route or service:

```javascript
const ApiError = require('./utils/ApiError');

app.get('/api/user/:id', (req, res, next) => {
  const user = null; // pretend DB returns null
  if (!user) {
    return next(new ApiError('User not found', 404, 'ERR_USER_NOT_FOUND'));
  }
});
```

---

## 🧰 Middleware: Centralized Error Handler

To catch and format these errors consistently:

```javascript
// middlewares/errorHandler.js

const ApiResponse = require('../utils/ApiResponse');

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const errorCode = err.errorCode || 'ERR_UNKNOWN';

  const response = ApiResponse.errorResponse(message, statusCode, {
    errorCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
```

And then plug it into your `app.js` or `server.js`:

```javascript
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler); // after routes
```

---

## 🧾 Error Response Format Example

```json
{
  "success": false,
  "message": "User not found",
  "data": {
    "errorCode": "ERR_USER_NOT_FOUND",
    "stack": "Error stack trace here (only in dev mode)"
  },
  "statusCode": 404
}
```

---

## 🧠 Why Use `ApiError`?

* **Centralized error handling** — clean controller logic.
* **Custom error codes** for frontend to interpret (like `ERR_USER_NOT_FOUND`).
* **Consistent format** for all kinds of errors: validation, DB, auth, etc.
* Works seamlessly with the `ApiResponse` class for output formatting.


*/