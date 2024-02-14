import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./AddTruck.module.css";
import { ADD_NEW_FOOD_TRUCK } from "../../utils/mutations";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import MenuItem from "@mui/material/MenuItem";

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  fontFamily: "Radley, sans-serif", // Set font for the body text
  "& form": {
    width: "100%", // Ensure the form takes up the full width
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .MuiButton-root": {
    marginTop: "20px", // Add some space between the form fields and the button
  },
});

const CenteredButton = styled(Button)({
  margin: "0 auto", // Center horizontally
  color: "var(--white)", // Set text color to white
  fontFamily: "Radley, sans-serif", // Set font for the button text
});

const GreenTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "var(--green)", // Set label text color to green
    fontFamily: "Radley, sans-serif", // Set font for the form field labels
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--green)", // Set label text color to green when focused
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--green)", // Set border color to green
    },
    "&:hover fieldset": {
      borderColor: "var(--green)", // Set border color to green on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--green)", // Set border color to green when focused
    },
  },
  "& .MuiInputBase-root": {
    fontFamily: "Radley, sans-serif", // Set font for the input text
  },
});

export default function AddTruck() {
  const [vendorName, setVendorName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [popular, setPopular] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [truckAdded, setTruckAdded] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [addTruck, { error }] = useMutation(ADD_NEW_FOOD_TRUCK);
  const { loading, data } = useQuery(QUERY_CATEGORIES);
  console.log("LOADING CATEGORIES");
  console.log(data);
  let categories = null;
  if (!loading) {
    categories = data.categories.map((category) => {
      return (
        <MenuItem key={category._id} value={category.name}>
          {category.name}
        </MenuItem>
      );
    });
    console.log(categories);
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Process form submission (e.g., send data to backend)
      console.log("Form submitted:", {
        vendorName,
        location,
        description,
        image,
        popular,
        categoryType,
      });
      // Show success message
      const response = await fetch(
        "https://geocode.maps.co/search?q=" + location + `&api_key=${GEOCODE}`
      );

      const data = await response.json();

      const addressLat = data[0].lat;
      const addressLon = data[0].lon;
      setLatitude(addressLat);
      setLongitude(addressLon);
      console.log("LOGGING COORDINATES");
      console.log(`${addressLat} ${addressLon}`);
      console.log("LOGGING THE LOGGED IN USER");
      console.log(Auth.getProfile().data.email);
      let foodTruck = await addTruck({
        variables: {
          vendorName: vendorName,
          description: description,
          image: image,
          popular: popular,
          location: location,
          owner: Auth.getProfile().data.email,
          latitude: addressLat,
          longitude: addressLon,
          category: categoryType,
        },
      });
      console.log("CREATED FOOD TRUCK");
      console.log(foodTruck);

      setSuccessMessage("Form submitted successfully!");

      // Reset form fields
      setVendorName("");
      setDescription("");
      setLocation("");
      setImage("");
      setPopular("");
      // Change button state to indicate truck added
      setTruckAdded(true);
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
        // Revert button state back to original after 0.5 seconds
        setTimeout(() => {
          setTruckAdded(false);
        }, 500);
      }, 3000);
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <h1>Add Truck</h1>
      <h3>
        Have a food truck? Want to become part of our network? Fill out the form
        below so we can connect your business with hungry people!
      </h3>
      <form onSubmit={handleSubmit}>
        <GreenTextField
          label="Vendor Name"
          variant="outlined"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <p>↓↓↓ Format: 123 Main St, New York, NY 10022 ↓↓↓</p>
        <GreenTextField
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <GreenTextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          multiline // Allow multiline input
          rows={4} // Initial number of rows
          maxRows={8} // Maximum number of rows before scrolling
          margin="normal"
        />
        <GreenTextField
          label="Vendor Image URL"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        {loading ? (
          <div>Loading</div>
        ) : (
          <GreenTextField
            select
            label="Categories"
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            required
            fullWidth
            margin="normal"
          >
            {categories}
          </GreenTextField>
        )}
        <GreenTextField
          label="Popular Items"
          variant="outlined"
          value={popular}
          onChange={(e) => setPopular(e.target.value)}
          required
          fullWidth
          multiline // Allow multiline input
          rows={4} // Initial number of rows
          maxRows={8} // Maximum number of rows before scrolling
          margin="normal"
        />
        <CenteredButton
          type="submit"
          variant="contained"
          color={truckAdded ? "success" : "warning"} // Conditional color based on truckAdded state
          className={truckAdded ? styles["success-button"] : ""}
        >
          {truckAdded ? "TRUCK ADDED" : "ADD TRUCK"}{" "}
          {/* Conditional text based on truckAdded state */}
        </CenteredButton>
      </form>
      {successMessage && (
        <p className={styles["success-message"]}>{successMessage}</p>
      )}
    </FormContainer>
  );
}
