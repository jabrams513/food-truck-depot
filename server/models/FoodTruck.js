const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const foodTruckSchema = new Schema({
    vendorName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    popular: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: false,
        trim: true
    },
    longitude: {
        type: String,
        required: false,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
});


const FoodTruck = model('FoodTruck', foodTruckSchema);

module.exports = FoodTruck;

