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
        },
        foodTruckById: async (parent, {truckId}) => {
            console.log("test")
            try{
                console.log(truckId)
                let truck = FoodTruck.findOne({_id:truckId})
                console.log(truck.vendorName)
                return truck;
            }catch(err){
                console.log(err)
            }
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
        createFoodTruck: async (parent, {vendorName, description, image, popular, owner, location, latitude, longitude}, context) => {
            if (context.user) {
                const foodTruck = await FoodTruck.create({vendorName, description, image, popular, owner: context.user.email, location, latitude, longitude});
                //add the foodTruck to the user's truck array
                const user = await User.updateOne(
                    {email: context.user.email},
                    {$addToSet: {trucks: foodTruck}}
                );
                const token = signToken(user);
                return {token, user};
            }
            else if (owner) {
                const foodTruck = await FoodTruck.create({vendorName, description, image, popular, owner: owner, location, latitude, longitude});
                //add the foodTruck to the user's truck array
                const user = await User.updateOne(
                    {email: owner},
                    {$addToSet: {trucks: foodTruck}}
                );
                const token = signToken(user);
                return {token, user};
            }

            throw AuthenticationError;
        },

        removeFoodTruck: async (parent, {foodTruckId}) => {
            return FoodTruck.findOneAndDelete({_id: foodTruckId});
        },


    }
};

module.exports = resolvers;



