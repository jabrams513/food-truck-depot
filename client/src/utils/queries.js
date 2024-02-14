import {gql} from '@apollo/client';

export const QUERY_USER = gql`query Query($email: String!) {
  user(email: $email) {
    _id
    email
    password
    role
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
`;

export const QUERY_USERS = gql`query Users {
  users {
    _id
    email
    password
    role
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
}`

export const QUERY_FOOD_TRUCKS = gql`query FoodTrucks {
  foodTrucks {
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
}`;

export const QUERY_FOOD_TRUCK_BY_NAME = gql`query FoodTrucks($vendorName: String!) {
  foodTruck(vendorName: $vendorName) {
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
}`;

export const QUERY_CATEGORIES = gql`query Query {
  categories {
    _id
    name
    image
    description
    trucks {
      _id
    }
  }
}`

export const QUERY_FOOD_TRUCK_BY_ID = gql`query FoodTruckById($truckId: ID) {
  foodTruckById(truckId: $truckId) {
    _id
    vendorName
    description
    image
    popular
    owner
    location
    latitude
    longitude
    category
  }
}`;
