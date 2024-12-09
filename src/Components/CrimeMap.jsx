import { useEffect, useState } from "react"; // Import React hooks for state and side-effects
import "./map.css"; // Import custom styles for the map component

// Importing necessary components from @vis.gl/react-google-maps and Material UI
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

// Fetching the Google Maps API key from environment variables
const apiKey = import.meta.env.VITE_MAPS_API_KEY;

// Component to display a marker with an info window when clicked
function MarkerWithInfowindow({ position, title, author, time }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false); // State to control the info window's visibility
  
  // Log the current timestamp (useful for debugging or performance tracking)
  console.log(Date.now());

  return (
    <>
      {/* AdvancedMarker component to show a marker on the map */}
      <AdvancedMarker
        onClick={() => setInfowindowOpen(true)} // Open the info window when the marker is clicked
        position={position} // Marker position
        title={title} // Marker title (crime type)
      />
      
      {/* Dialog (info window) showing details when the marker is clicked */}
      {infowindowOpen && (
        <Dialog
          sx={{ w: 500 }} // Set width of the dialog
          open={infowindowOpen} // Dialog is open based on the infowindowOpen state
          onClose={() => setInfowindowOpen(false)} // Close the dialog when clicked outside
        >
          {/* Dialog title containing the crime type and reporter's info */}
          <DialogTitle>
            {title}
            <Typography>{"Reported by User-" + author}</Typography>
          </DialogTitle>
          
          {/* Dialog content displaying detailed information about the crime report */}
          <DialogContent>
            <Typography>
              {title +
                " reported at: (" +
                position.lat +
                ", " +
                position.lng +
                ") on " +
                time}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// Main map component that renders the crime map
export default function CrimeMap() {
  const [dataPoints, setDataPoints] = useState(); // State to hold crime report data

  // Fetching crime data from the backend using useEffect (side-effect)
  useEffect(() => {
    fetch("http://localhost:3000/api/crime-data") // API endpoint to fetch crime data
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log(data); // Log the fetched data for debugging
        setDataPoints(data); // Set the fetched data to state
      })
      .catch((error) => console.error("Error fetching crime data:", error)); // Handle any errors in the fetch request
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <APIProvider apiKey={apiKey}> {/* Provide the API key to the map components */}
      <Map
        className="map" // Apply custom styles for the map
        mapId="Crime Map" // Unique ID for the map
        defaultZoom={10} // Set default zoom level for the map
        defaultCenter={{ lat: 34.0549, lng: -118.2426 }} // Default map center (Los Angeles)
      >
        <>
          {/* Render markers for each crime report */}
          {dataPoints
            ? dataPoints.map((report) => {
                const location = { lat: report.latitude, lng: report.longitude }; // Convert data to position object
                return (
                  <MarkerWithInfowindow
                    key={report.report_time} // Use report time as the unique key for each marker
                    position={location ?? { lng: 0, lat: 0 }} // Set marker position
                    title={report.crime_type ?? ""} // Set title (crime type)
                    author={report.user_id ?? ""} // Set reporter's ID
                    time={report.report_time ?? ""} // Set report time
                  ></MarkerWithInfowindow>
                );
              })
            : null} {/* Render markers only if dataPoints exists */}
        </>
      </Map>
    </APIProvider>
  );
}
