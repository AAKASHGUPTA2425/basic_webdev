class ApiResponse{
    constructor(statusCode,data,message="Success"){
  this.statusCode=statusCode
  this.data=data
  this.message=message
  this.success=statusCode<400
    }
}
export { ApiResponse }


/*



## ✅ What is the `ApiResponse` class?

The `ApiResponse` class is a **custom utility class** that you create in your Node.js backend to **standardize the structure** of all your API responses — whether they’re successful or error responses.

It ensures that **all responses follow the same format**, which makes:

* Frontend consumption easier.
* Debugging and logging more consistent.
* Error handling more manageable.

---

## 🔍 Typical Structure of an API Response

A well-structured API response usually includes:

| Field              | Description                                         |
| ------------------ | --------------------------------------------------- |
| `success`          | Boolean indicating if the operation was successful. |
| `message`          | Human-readable message explaining the result.       |
| `data`             | Payload (object or array) returned from the server. |
| `statusCode`       | HTTP status code (e.g., 200, 404, 500).             |
| `error` (optional) | Additional error information for failed responses.  |

---

## 🏗️ Full `ApiResponse` Class – Explained in Detail

```javascript
// utils/ApiResponse.js

class ApiResponse {
  constructor(success, message, data = null, statusCode = 200) {
    this.success = success;          // Boolean: true/false
    this.message = message;          // String: description of result
    this.data = data;                // Payload: object, array, etc.
    this.statusCode = statusCode;    // HTTP status code
  }

  // Static method for successful response
  static successResponse(message, data = null, statusCode = 200) {
    return new ApiResponse(true, message, data, statusCode);
  }

  // Static method for error response
  static errorResponse(message, statusCode = 400, data = null) {
    return new ApiResponse(false, message, data, statusCode);
  }
}

module.exports = ApiResponse;
```

### ✅ Key Concepts:

* `constructor(...)`: This initializes the object with your custom fields.
* `static successResponse(...)`: A convenient way to return a consistent success object.
* `static errorResponse(...)`: A consistent structure for error handling.

---

## 📦 Example Usage in Express.js

```javascript
const express = require('express');
const ApiResponse = require('./utils/ApiResponse');

const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: 'Alice' }];
  const response = ApiResponse.successResponse('Users fetched successfully', users);
  res.status(response.statusCode).json(response);
});

app.get('/api/fail', (req, res) => {
  const response = ApiResponse.errorResponse('Something went wrong', 500);
  res.status(response.statusCode).json(response);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## 🧾 Output Example

### ✅ Success:

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    { "id": 1, "name": "Alice" }
  ],
  "statusCode": 200
}
```

### ❌ Error:

```json
{
  "success": false,
  "message": "Something went wrong",
  "data": null,
  "statusCode": 500
}
```

---

## 🚀 Benefits of Using `ApiResponse` Class

* **Consistency** across all API endpoints.
* Easier to handle and debug on the **frontend**.
* Better **error tracking/logging**.
* Reduces **repetition** — no need to manually create the same response structure in every route.

---

## 🧩 Optional Enhancements

You can customize the class further to include:

* `timestamp`
* `errorCode`
* `path` (endpoint URL)
* `stack` trace (for development)

### Example:

```javascript
class ApiResponse {
  constructor(success, message, data = null, statusCode = 200, errorCode = null) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
  }

  static successResponse(message, data = null, statusCode = 200) {
    return new ApiResponse(true, message, data, statusCode);
  }

  static errorResponse(message, statusCode = 400, data = null, errorCode = 'ERR_GENERAL') {
    return new ApiResponse(false, message, data, statusCode, errorCode);
  }
}
*/