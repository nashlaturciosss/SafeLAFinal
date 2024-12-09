import {
	Box,               // Box component for layout and styling
	Button,            // Button component for the submit button
	FormControl,       // FormControl component to wrap the dropdown input for "Crime"
	InputLabel,        // InputLabel component to label the dropdown
	MenuItem,          // MenuItem component for the options in the dropdown
	Select,            // Select component to create a dropdown list
	TextField,         // TextField component for user input fields (latitude and longitude)
	Toolbar,           // Toolbar component for spacing and layout
	Typography,        // Typography component for consistent text styles
  } from "@mui/material"; // Material-UI components for styling
  
  import Navbar from "../Components/Navbar"; // Import the Navbar component to render the header
  import { useState } from "react"; // useState hook to manage state in the component
  import {
	AdvancedMarker,    // AdvancedMarker component from Vis.gl for placing markers on the map
	APIProvider,       // APIProvider component to provide the Google Maps API key
	Map,               // Map component from Vis.gl to render the map
	Pin,               // Pin component to display custom map pins
  } from "@vis.gl/react-google-maps"; // Vis.gl for Google Maps integration
  
  import moment from "moment/moment"; // Moment.js for formatting the current date and time
  
  const apiKey = import.meta.env.VITE_MAPS_API_KEY; // Import the Google Maps API key from environment variables
  
  // MarkerPin component to render a pin on the map at a specific latitude and longitude
  function MarkerPin({ lat, lng }) {
	return (
	  <AdvancedMarker position={{ lat: lat, lng: lng }}>
		<Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
	  </AdvancedMarker>
	);
  }
  
  // handleSubmit function to send the crime report data to the backend
  async function handleSubmit(crimeData) {
	try {
	  const response = await fetch("http://localhost:3000/api/report-crime", {
		method: "POST",  // Use the POST method to send data
		headers: {
		  "Content-Type": "application/json",  // Send data as JSON
		},
		body: JSON.stringify(crimeData),  // Convert crimeData object to JSON string
	  });
  
	  if (!response.ok) {
		throw new Error("Network response was not ok");  // Handle non-OK responses
	  }
  
	  const responseData = await response.json();  // Parse the JSON response
	  console.log("Response:", responseData);  // Log the response data
	} catch (error) {
	  console.error("Error:", error);  // Log any errors during the fetch operation
	}
  
	window.alert("Record Submitted");  // Show an alert after the submission
  }
  
  // Report component to render the crime reporting form and map
  export default function Report() {
	const [lat, setLat] = useState(-33.860664);  // State for latitude, initialized with default value
	const [lng, setLng] = useState(151.208138);  // State for longitude, initialized with default value
	const [crime, setCrime] = useState("");      // State for the selected crime type
  
	return (
	  <>
		{/* Navbar component to display the page's navigation header */}
		<Navbar />
		<Toolbar /> {/* Toolbar component for spacing below the Navbar */}
  
		{/* Box container to center the page's title */}
		<Box display="flex" justifyContent={"center"}>
		  <Typography sx={{ color: "#2196F3" }} variant="h1">
			<b>Report a Crime</b>  {/* Display the title "Report a Crime" */}
		  </Typography>
		</Box>
  
		{/* Box for laying out the form and map side by side */}
		<Box display="flex" flexDirection="row">
		  <Box
			sx={{ m: 2, flex: "1 1 0", display: "flex", justifyContent: "center" }}
		  >
			<Box>
			  <Box>
				{/* TextFields for latitude and longitude input */}
				<TextField
				  sx={{ pr: 1 }}
				  id="outlined"
				  label="Latitude"
				  value={isNaN(lat) ? "" : lat}  // Display latitude or empty string if NaN
				  onChange={(event) => {
					setLat(parseFloat(event.target.value));  // Update latitude when input changes
				  }}
				/>
				<TextField
				  sx={{ pl: 1 }}
				  id="outlined"
				  label="Longitude"
				  value={isNaN(lng) ? "" : lng}  // Display longitude or empty string if NaN
				  onChange={(event) => {
					setLng(parseFloat(event.target.value));  // Update longitude when input changes
				  }}
				/>
			  </Box>
			  <Box sx={{ py: 2 }}>
				{/* Dropdown for selecting crime type */}
				<FormControl fullWidth>
				  <InputLabel id="demo-simple-select-label">Crime</InputLabel>
				  <Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={crime}
					label="Crime"
					onChange={(event) => {
					  setCrime(event.target.value);  // Update crime type when selection changes
					}}
				  >
					{/* Menu items for different crime types */}
					<MenuItem value={"vandalism"}>Vandalism</MenuItem>
					<MenuItem value={"Homocide"}>Homocide</MenuItem>
					<MenuItem value={"Assult"}>Assult</MenuItem>
					<MenuItem value={"Robbery"}>Robbery</MenuItem>
				  </Select>
				</FormControl>
			  </Box>
			  {/* Submit button to submit the crime report */}
			  <Button
				variant="contained"
				fullWidth
				sx={{ my: 1 }}
				onClick={() =>
				  handleSubmit({
					latitude: lat,
					longitude: lng,
					report_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),  // Current date and time formatted
					crime_type: crime,
					user_id: Math.floor(Math.random() * 1000),  // Random user ID for simplicity
				  })
				}
			  >
				Submit  {/* Button text */}
			  </Button>
			</Box>
		  </Box>
  
		  {/* Box for the Google Map */}
		  <Box sx={{ m: 1, flex: "1 1 0", height: 500 }}>
			<APIProvider apiKey={apiKey}> {/* Provide the Google Maps API key */}
			  <Map
				onClick={(e) => {
				  const latlng = e.detail.latLng;  // Get the latitude and longitude of the click
				  setLat(latlng.lat);  // Update latitude
				  setLng(latlng.lng);  // Update longitude
				}}
				mapId="Crime Map"  // Map ID for styling
				defaultZoom={10}  // Default zoom level
				defaultCenter={{ lat: 34.0549, lng: -118.2426 }}  // Default map center (Los Angeles)
			  >
				{/* Conditionally render MarkerPin if lat/lng are valid */}
				{lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 ? (
				  <MarkerPin lat={lat} lng={lng} />
				) : null}
			  </Map>
			</APIProvider>
		  </Box>
		</Box>
	  </>
	);
  }
  