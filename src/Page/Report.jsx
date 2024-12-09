import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import moment from "moment/moment";

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const apiUrl = "https://safe-la-final.vercel.app/api/report-crime";

function MarkerPin({ lat, lng }) {
  return (
    <AdvancedMarker position={{ lat, lng }}>
      <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
    </AdvancedMarker>
  );
}

async function handleSubmit(crimeData) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crimeData),
    });

    if (!response.ok) throw new Error("Network response was not ok");
    console.log("Response:", await response.json());
  } catch (error) {
    console.error("Error:", error);
  }

  window.alert("Record Submitted");
}

export default function Report() {
  const [lat, setLat] = useState(-33.860664);
  const [lng, setLng] = useState(151.208138);
  const [crime, setCrime] = useState("");

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box display="flex" justifyContent={"center"}>
        <Typography sx={{ color: "#2196F3" }} variant="h1">
          <b>Report a Crime</b>
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box sx={{ m: 2, flex: "1 1 0", display: "flex", justifyContent: "center" }}>
          <Box>
            <TextField
              sx={{ pr: 1 }}
              label="Latitude"
              value={lat}
              onChange={(e) => setLat(parseFloat(e.target.value))}
            />
            <TextField
              sx={{ pl: 1 }}
              label="Longitude"
              value={lng}
              onChange={(e) => setLng(parseFloat(e.target.value))}
            />
            <FormControl fullWidth sx={{ py: 2 }}>
              <InputLabel>Crime</InputLabel>
              <Select
                value={crime}
                onChange={(e) => setCrime(e.target.value)}
              >
                <MenuItem value="vandalism">Vandalism</MenuItem>
                <MenuItem value="homicide">Homicide</MenuItem>
                <MenuItem value="assault">Assault</MenuItem>
                <MenuItem value="robbery">Robbery</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              fullWidth
              sx={{ my: 1 }}
              onClick={() =>
                handleSubmit({
                  latitude: lat,
                  longitude: lng,
                  report_time: moment().format("YYYY-MM-DD HH:mm:ss"),
                  crime_type: crime,
                  user_id: Math.floor(Math.random() * 1000),
                })
              }
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box sx={{ m: 1, flex: "1 1 0", height: 500 }}>
          <APIProvider apiKey={apiKey}>
            <Map
              mapId="Crime Map"
              defaultZoom={10}
              defaultCenter={{ lat: 34.0549, lng: -118.2426 }}
              onClick={(e) => {
                const { lat, lng } = e.detail.latLng;
                setLat(lat);
                setLng(lng);
              }}
            >
              {lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && (
                <MarkerPin lat={lat} lng={lng} />
              )}
            </Map>
          </APIProvider>
        </Box>
      </Box>
    </>
  );
}
