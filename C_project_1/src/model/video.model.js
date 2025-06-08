import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema(
    {
        videofile:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        view:{
            type:Number,
            required:true,
            default:0
        },
        ispublished:{
            type:Boolean,
            required:true,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            req:"User"
        }
    }, {
    timestamps: true
}
)
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)
/*### 📦 What is `mongoose-aggregate-paginate-v2`?

`mongoose-aggregate-paginate-v2` is a **Mongoose plugin** that adds **pagination capabilities** to **aggregation pipelines** in MongoDB. It makes it easy to paginate results returned from complex `aggregate()` queries — something not directly supported by Mongoose's default pagination helpers like `mongoose-paginate-v2`.

---

## ✅ Why Use It?

* Supports **aggregation queries**, unlike basic `.find()` paginators.
* Useful for **joining collections**, filtering, grouping, and still paginating.
* Returns helpful pagination metadata (`page`, `limit`, `totalDocs`, etc.)

---

## 🚀 Installation

```bash
npm install mongoose-aggregate-paginate-v2
```

---

## 🔧 Setup in Mongoose Model

```javascript
const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number
});

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
```

---

## 🧾 Basic Usage Example

```javascript
const Product = require('./models/Product');

const aggregate = Product.aggregate([
  { $match: { category: 'electronics' } },
  { $sort: { price: -1 } }
]);

const options = {
  page: 1,
  limit: 10
};

Product.aggregatePaginate(aggregate, options)
  .then(result => {
    console.log('Paginated Result:', result);
  })
  .catch(err => console.error(err));
```

---

## 📦 Result Format

The result returned is structured like this:

```json
{
  "docs":[paginated data] ,
  "totalDocs": 100,
  "limit": 10,
  "page": 1,
  "totalPages": 10,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

---

## 🎯 Use Cases

* Dashboards with filters and search.
* Reports with aggregation logic.
* APIs returning sorted/filtered/joined data.

---

## 🔒 Notes

* Use `.aggregate()` not `.find()`.
* You can include stages like `$lookup`, `$project`, `$group`, etc.
* Must call `aggregatePaginate()` on the aggregation cursor.

*/