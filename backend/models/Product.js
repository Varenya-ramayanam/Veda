const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    countInStock:{
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {timestamps: true,versionKey: false});

module.exports = mongoose.model('Product', productSchema);