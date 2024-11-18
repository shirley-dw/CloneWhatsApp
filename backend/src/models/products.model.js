/* Composicion de mis productos:
title , price, stock, description, category, active, seller_id, create_at

*/

// Crear el modelo de productos

import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    seller_id: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productsSchema);


export default Product;
