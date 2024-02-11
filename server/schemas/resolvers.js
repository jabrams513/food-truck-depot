const {User, FoodTruck} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, {username}) => {
            return User.findOne({username});
        },
        foodTrucks: async () => {
            return FoodTruck.find();
        },
        foodTruck: async (parent, {vendorName}) => {
            return FoodTruck.findOne({vendorName});
        }
    },
    Mutation: {
        createUser: async (parent, {email, password, role}) => {
            const user = await User.create({email, password, role});
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                console.log("DIDNT FIND USER");
                throw AuthenticationError;
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                console.log("INCORRECT PASSWorD");
                throw AuthenticationError;
            }

            const token = signToken(user);

            return {token, user};
        },
        createFoodTruck: async (parent, {vendorName, description, image, popular}) => {
            if (context.user) {
                const foodTruck = await FoodTruck.create({vendorName, description, image, popular, owner: context.user.email});
                //add the foodTruck to the user's truck array
                const user = await User.updateOne(
                    {email: context.user.email},
                    {$addToSet: {trucks: foodTruck}}
                );
                return foodTruck;
            }

            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;



