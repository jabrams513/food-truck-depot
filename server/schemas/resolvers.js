const {User, FoodTruck, Category} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate("trucks");
        },
        user: async (parent, {email}) => {
            return User.findOne({email}).populate("trucks");
        },
        foodTrucks: async () => {
            return FoodTruck.find();
        },
        foodTruck: async (parent, {vendorName}) => {
            return FoodTruck.findOne({vendorName});
        },
        categories: async () => {
            return Category.find();
        },
        category: async (parent, {name}) => {
            return Category.findOne({name});
        }
    },
    Mutation: {
        createUser: async (parent, {email, password}) => {
            console.log("IN CREATE USER RESOLVER");
            const user = await User.create({email, password});
            console.log("LOGGING NEW USER");
            console.log(user)
            const token = signToken({email: user.email, _id: user._id});

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            console.log("IN LOGGED IN RESOLVER");
            const user = await User.findOne({email});
            console.log("LOGGING FOUND USER");
            console.log(user);
            if (!user) {
                console.log("DIDNT FIND USER");
                throw AuthenticationError;
            }

            const correctPW = await user.isCorrectPassword(password);
            console.log("IS THE PASSWORD RIGHT?");
            console.log(correctPW);
            if (!correctPW) {
                console.log("INCORRECT PASSWorD");
                throw AuthenticationError;
            }

            const token = signToken(user);
            console.log(token);
            return {token, user};
        },
        createFoodTruck: async (parent, {vendorName, description, image, popular, category, owner, location, latitude, longitude}) => {

            try {
                console.log("LOGGING IN THE RESOLVER");
                console.log(vendorName);
                console.log(description);
                console.log(image);
                console.log(popular);
                console.log(owner);
                console.log(location);
                console.log(latitude);
                console.log(longitude);
                console.log(category)
                const foodTruck = await FoodTruck.create({vendorName: vendorName, description: description, image: image, popular: popular, owner: owner, location: location, latitude: latitude, longitude: longitude, category: category});
                //add the foodTruck to the user's truck array
                console.log("CREATED FOOD TRUCK");
                console.log(foodTruck);
                const user = await User.updateOne(
                    {email: owner},
                    {$addToSet: {trucks: foodTruck}}
                );
                console.log("LOGGING FOUND USER");
                console.log(user);

                return foodTruck;

            }
            catch (e) {
                console.log(e);
                throw AuthenticationError;
            }

        },

        removeFoodTruck: async (parent, {foodTruckId}) => {
            return FoodTruck.findOneAndDelete({_id: foodTruckId});
        },


    }
};

module.exports = resolvers;



