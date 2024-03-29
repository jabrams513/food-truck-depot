const typeDefs = `
  type User {
    _id: ID
    email: String
    password: String
    trucks: [FoodTruck]
  }

  type Category {
    _id: ID
    name: String!
    image: String
    description: String
    trucks: [FoodTruck]
  }

  type FoodTruck {
    _id: ID
    vendorName: String!
    description: String
    image: String
    popular: String
    owner: String!
    location: String
    latitude: String
    longitude: String
    category: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    foodTrucks: [FoodTruck]
    foodTruck(vendorName: String!): FoodTruck
    foodTruckById(truckId: ID): FoodTruck 
    categories: [Category]
    category(name: String!): Category
  }

  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createFoodTruck(vendorName: String!, description: String, image: String, popular: String, owner: String, location: String, latitude: String, longitude: String, category: String): FoodTruck
    removeFoodTruck(foodTruckId: ID!): FoodTruck
  }
`;

module.exports = typeDefs;
