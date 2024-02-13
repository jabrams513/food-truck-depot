import {gql} from '@apollo/client';

export const LOGIN_USER = gql`mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      password
      trucks {
        _id
        vendorName
        description
        image
        popular
        owner
        location
        latitude
        longitude
      }
    }
  }
}
`;

export const SIGN_UP_USER = gql`mutation Mutation($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
    token
    user {
      _id
      email
      password
      trucks {
        _id
        vendorName
        description
        image
        popular
        owner
        location
        latitude
        longitude
      }
    }
  }
}`;

export const ADD_NEW_FOOD_TRUCK = gql`mutation Mutation($vendorName: String!, $description: String, $image: String, $popular: String, $owner: String, $location: String) {
  createFoodTruck(vendorName: $vendorName, description: $description, image: $image, popular: $popular, owner: $owner, location: $location) {
    token
    user {
      email
      trucks {
        _id
        vendorName
        description
        image
        popular
        owner
        location
        latitude
        longitude
      }
    }
  }
}`