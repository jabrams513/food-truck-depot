const typeDefs = `
  type User {
    _id: ID
    email: String
    password: String
    role: String
    trucks: [FoodTruck]
  }

  type FoodTruck {
    _id: ID
    vendorName: String!
    description: String
    image: String
    popular: String
    owner: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    trucks: [FoodTruck]
    truck(vendorName: String!): FoodTruck
  }

  type Mutation {
    createUser(email: String!, password: String!, role: String!): Auth
    login(email: String!, password: String!): Auth
    createFoodTruck(vendorName: String!, description: String, image: String, popular: String, owner: String): Auth
  }
`;

module.exports = typeDefs;
