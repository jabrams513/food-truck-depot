const typeDefs = `
  type User {
    _id: ID
    email: String
    password: String
    role: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
  }
`;

module.exports = typeDefs;
