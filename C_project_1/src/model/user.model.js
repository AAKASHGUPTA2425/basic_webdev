import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from'bcrypt'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            index: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true

        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,//cloudinary url
            required: true,

        },
        coverImage: { //cloudinary url
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type:  String
        }
    }, {
    timestamps: true
}
)
userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))return next();
    this.password= await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})
}
userSchema.methods.generateRefreshToken=function(){
   return jwt.sign({
        _id:this._id,
        
    },process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})
}


export const User = mongoose.model("User", userSchema)
/*### 🔐 What is JWT?


**JWT (JSON Web Token)** is a compact, URL-safe token format used for **secure transmission of information between parties** — most commonly for **authentication and authorization** in web applications.

---

## 🧾 JWT Structure

A JWT has **three parts**, separated by dots (`.`):

```
<Header>.<Payload>.<Signature>
```

### Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjg0ODgxMjM0fQ
.
N6qv...signature_hash
```

### 1. **Header**: metadata

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. **Payload**: the actual data (claims)

```json
{
  "userId": "1234567890",
  "email": "user@example.com",
  "role": "admin"
}
```

### 3. **Signature**: cryptographic signature to prevent tampering

```text
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

---

## ✅ Why Use JWT?

* Stateless authentication (no sessions stored on server)
* Secure data transfer (signed and optionally encrypted)
* Works well with APIs, SPAs, mobile apps

---

## ⚙️ How JWT Works in Authentication

1. User logs in with email/password.
2. Server **verifies credentials** and returns a **signed JWT**.
3. Client stores JWT (e.g., in `localStorage`).
4. On future requests, client sends JWT in the `Authorization` header:

   ```
   Authorization: Bearer <token>
   ```
5. Server **verifies the token** using a secret key and grants access.

---

## 🔧 How to Use JWT in Node.js (with Express)

### 1. **Install dependencies**

```bash
npm install jsonwebtoken dotenv
```

---

### 2. **Sign a Token**

```javascript
const jwt = require('jsonwebtoken');

const user = { id: 'abc123', role: 'admin' };
const secret = process.env.JWT_SECRET;

const token = jwt.sign(user, secret, { expiresIn: '1h' });
console.log(token);
```

---

### 3. **Verify a Token (Middleware)**

```javascript
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}
```

Use it like:

```javascript
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Protected content', user: req.user });
});
```

---

## 🔒 Security Tips

* Use strong `JWT_SECRET`
* Set short expiration times (`expiresIn`)
* Use `https` to avoid token leakage
* Do **not** store JWT in cookies unless HTTP-only
* Rotate/blacklist tokens if needed

---

## 🚀 Summary

| Feature          | JWT Usage                        |
| ---------------- | -------------------------------- |
| Format           | JSON (Base64 encoded)            |
| Usage            | Authentication / Authorization   |
| Stateless?       | Yes (stored client-side)         |
| Secure?          | Yes, if signed & stored properly |
| Common Libraries | `jsonwebtoken`, `passport-jwt`   |


*/

/*### 🔐 What is `bcrypt`?

**`bcrypt`** is a **password hashing library** used to securely store passwords. Instead of storing plain-text passwords in your database (which is very insecure), `bcrypt` creates a **hashed version** of the password that is safe to store.

It is commonly used in Node.js applications for **user authentication systems**.

---

## 🧠 Why Use `bcrypt`?

* ✅ **One-way hashing**: You can't reverse the hash back to the original password.
* 🔁 **Salted hashes**: It adds random data to each hash to make it unique, even for the same input.
* 🛡️ **Resistant to rainbow table attacks**.
* 🐢 Intentionally slow to **slow down brute-force attacks**.

---

## 🔧 How to Use `bcrypt` in Node.js

### 1. **Install bcrypt**

```bash
npm install bcrypt
```

---

### 2. **Hashing a Password**

```javascript
const bcrypt = require('bcrypt');

const plainPassword = 'mySecretPassword';
const saltRounds = 10; // More rounds = slower = more secure

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Hashed password:', hash);
});
```

Or using `async/await`:

```javascript
const hash = await bcrypt.hash(plainPassword, 10);
```

---

### 3. **Verifying a Password**

When a user logs in:

```javascript
const storedHash = '$2b$10$z...'; // from your DB

bcrypt.compare('userInputPassword', storedHash, (err, result) => {
  if (result) {
    console.log('Password is correct!');
  } else {
    console.log('Invalid password.');
  }
});
```

Or using `async/await`:

```javascript
const isMatch = await bcrypt.compare('userInputPassword', storedHash);
```

---

## 🧾 Real-World Example

### Register Route

```javascript
const bcrypt = require('bcrypt');
const User = require('./models/User');

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered successfully' });
});
```

### Login Route

```javascript
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful' });
});
```

---

## 🧠 Tips

| Tip                     | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| Use `bcrypt.hash()`     | Not just `hashSync()` unless you really need synchronous logic |
| Store only the hash     | Never store or log the original password                       |
| Use `>= 10` salt rounds | 10–12 is typical for good security/performance balance         |


*/