import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { vendors } from '../Home/Home.jsx';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  fontFamily: 'Radley, sans-serif',
  '& form': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& .MuiButton-root': {
    marginTop: '20px',
  },
});

const GreenTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: 'var(--green)',
    fontFamily: 'Radley, sans-serif',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--green)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--green)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--green)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--green)',
    },
  },
  '& .MuiInputBase-root': {
    fontFamily: 'Radley, sans-serif',
  },
});

export default function FoodTruckReservation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [comments, setComments] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [isRequiredChecked, setIsRequiredChecked] = useState(false);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = vendors.filter(vendor =>
      vendor.vendorName.toLowerCase().includes(query)
    );
    setFilteredVendors(filtered);
  };

  const handleVendorSelection = (vendor) => {
    setSearchQuery(vendor.vendorName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if a vendor is selected
    if (!filteredVendors.some(vendor => vendor.vendorName.toLowerCase() === searchQuery.toLowerCase())) {
      // No vendor selected, prevent form submission and display error message
      setIsRequiredChecked(true);
      return;
    }

    // Check if all other required fields are filled out
    if (!date || !startTime || !endTime || !eventType || !numGuests || !serviceAddress || !comments) {
      // Validation failed, not all fields are filled out
      setIsRequiredChecked(true);
      return;
    }

    // Simulate API call or data processing
    console.log('Reservation details:', { date, startTime, endTime, eventType, numGuests, comments, serviceAddress });
    setIsReserved(true);
    setIsRequiredChecked(false); // Reset required indication
    // Clear form fields
    setDate('');
    setStartTime('');
    setEndTime('');
    setEventType('');
    setNumGuests('');
    setComments('');
    setServiceAddress('');
    setSearchQuery(''); // Empty the search query
    setFilteredVendors([]); // Clear the filtered vendors list
    // Reset reservation status after 3 seconds
    setTimeout(() => {
      setIsReserved(false);
    }, 3000);
  };

  return (
    <FormContainer>
      <h1>Food Truck Reservation</h1>
      <form onSubmit={handleSubmit}>
        <GreenTextField
          label="Search & Select Vendors"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          margin="normal"
        />
        {/* Display the filtered vendors */}
        <div>
          {filteredVendors.map((vendor, index) => (
            <Button
              key={index}
              variant="contained"
              style={{
                margin: '5px', // Add margin for spacing between buttons
                backgroundColor: 'var(--green)', // Set background color
                color: 'var(--white)', // Set text color
              }}
              onClick={() => handleVendorSelection(vendor)}
            >
              {vendor.vendorName}
            </Button>
          ))}
        </div>
        <GreenTextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <GreenTextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            margin="normal"
          />
          <GreenTextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            margin="normal"
          />
        </div>
        <GreenTextField
          select
          label="Event Type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
          fullWidth
          margin="normal"
        >
          <MenuItem value="Birthday Party">Birthday Party</MenuItem>
          <MenuItem value="Corporate Event">Corporate Event</MenuItem>
          <MenuItem value="Wedding">Wedding</MenuItem>
          <MenuItem value="Graduation">Graduation</MenuItem>
          <MenuItem value="Anniversary">Anniversary</MenuItem>
          <MenuItem value="Holiday Party">Holiday Party</MenuItem>
          <MenuItem value="Fundraiser">Fundraiser</MenuItem>
          <MenuItem value="Galas and Balls">Galas and Balls</MenuItem>
          <MenuItem value="Concerts and Festivals">Concerts and Festivals</MenuItem>
          <MenuItem value="Family Reunions">Family Reunions</MenuItem>
          <MenuItem value="Religious Celebrations">Religious Celebrations</MenuItem>
          <MenuItem value="Networking Events">Networking Events</MenuItem>
          <MenuItem value="Community Events">Community Events</MenuItem>
          <MenuItem value="School Functions">School Functions</MenuItem>
          <MenuItem value="Sporting Events">Sporting Events</MenuItem>
          <MenuItem value="Other">Other (Specify in Comments)</MenuItem>
        </GreenTextField>
        <GreenTextField
          select
          label="Number of Guests"
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
          required
          fullWidth
          margin="normal"
        >
          <MenuItem value="Less than 10">Less than 10</MenuItem>
          <MenuItem value="11-25">11-25</MenuItem>
          <MenuItem value="26-50">26-50</MenuItem>
          <MenuItem value="51-100">51-100</MenuItem>
          <MenuItem value="More than 100">More than 100</MenuItem>
        </GreenTextField>
        <GreenTextField
          label="Service Address"
          value={serviceAddress}
          onChange={(e) => setServiceAddress(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <GreenTextField
          label="Comments"
          multiline
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputProps={{ classes: { root: 'MuiOutlinedInput-root' } }}
        />
        {isRequiredChecked && <p style={{ color: 'red' }}>All fields are required. Please review your entries.</p>}
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: isReserved ? 'var(--green)' : 'var(--orange)', marginTop: '20px' }}
          color={isReserved ? 'success' : 'primary'}
        >
          {isReserved ? <span style={{ color: 'var(--orange)' }}>TRUCK RESERVED</span> : 'Reserve Truck'}
        </Button>
        {isReserved && <p style={{ color: 'var(--green)', marginTop: '10px' }}>Success! Truck reserved. The vendor will contact you son with more details.</p>}
      </form>
    </FormContainer>
  );
}
