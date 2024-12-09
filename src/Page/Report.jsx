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

function MarkerPin({ lat, lng }) {
	return (
		<AdvancedMarker position={{ lat: lat, lng: lng }}>
			<Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
		</AdvancedMarker>
	);
}

async function handleSubmit(crimeData) {
	try {
		const response = await fetch("http://localhost:3000/api/report-crime", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(crimeData),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();
		console.log("Response:", responseData);
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
				<Box
					sx={{ m: 2, flex: "1 1 0", display: "flex", justifyContent: "center" }}
				>
					<Box>
						<Box>
							<Box>
								<TextField
									sx={{ pr: 1 }}
									id="outlined"
									label="Latitude"
									value={isNaN(lat) ? "" : lat}
									onChange={(event) => {
										setLat(parseFloat(event.target.value));
									}}
								/>
								<TextField
									sx={{ pl: 1 }}
									id="outlined"
									label="Longitude"
									value={isNaN(lng) ? "" : lng}
									onChange={(event) => {
										setLng(parseFloat(event.target.value));
									}}
								/>
							</Box>
							<Box sx={{ py: 2 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Crime</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={crime}
										label="Crime"
										onChange={(event) => {
											setCrime(event.target.value);
										}}
									>
										<MenuItem value={"vandalism"}>Vandalism</MenuItem>
										<MenuItem value={"Homocide"}>Homocide</MenuItem>
										<MenuItem value={"Assult"}>Assult</MenuItem>
										<MenuItem value={"Robbery"}>Robbery</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Box>
						<Button
							variant="contained"
							fullWidth
							sx={{ my: 1 }}
							onClick={() =>
								handleSubmit({
									latitude: lat,
									longitude: lng,
									report_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
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
							onClick={(e) => {
								const latlng = e.detail.latLng;
								setLat(latlng.lat);
								setLng(latlng.lng);
							}}
							mapId="Crime Map"
							defaultZoom={10}
							defaultCenter={{ lat: 34.0549, lng: -118.2426 }}
						>
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
