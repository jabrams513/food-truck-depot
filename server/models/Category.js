const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    trucks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FoodTruck'
        }
    ]
});


const Category = model('Category', categorySchema);

module.exports = Category;

