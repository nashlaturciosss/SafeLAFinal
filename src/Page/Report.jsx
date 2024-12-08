import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import {
	AdvancedMarker,
	APIProvider,
	Map,
	Pin,
} from "@vis.gl/react-google-maps";

const apiKey = import.meta.env.VITE_MAPS_API_KEY;

function MarkerPin({ lat, lng }) {
	return (
		<AdvancedMarker position={{ lat: lat, lng: lng }}>
			<Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
		</AdvancedMarker>
	);
}

function handleSubmit(crimeData) {
	console.log(crimeData);
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
							<TextField
								fullWidth
								sx={{ my: 2 }}
								id="outlined"
								label="Crime"
								onChange={(event) => {
									setCrime(event.target.value);
								}}
							/>
						</Box>
						<Button
							variant="contained"
							fullWidth
							sx={{ my: 1 }}
							onClick={() => handleSubmit({ lng: lng, lat: lat, crime: crime })}
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
							defaultZoom={13}
							defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
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
