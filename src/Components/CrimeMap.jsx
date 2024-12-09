import { useEffect, useState } from "react";
import "./map.css";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

const apiKey = import.meta.env.VITE_MAPS_API_KEY; // Google Maps API key
const apiUrl = "https://safe-la-final.vercel.app/api/crime-data"; // Backend URL

function MarkerWithInfowindow({ position, title, author, time }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        onClick={() => setInfowindowOpen(true)}
        position={position}
        title={title}
      />
      {infowindowOpen && (
        <Dialog open={infowindowOpen} onClose={() => setInfowindowOpen(false)}>
          <DialogTitle>
            {title}
            <Typography>{"Reported by User-" + author}</Typography>
          </DialogTitle>
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

export default function CrimeMap() {
  const [dataPoints, setDataPoints] = useState();

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setDataPoints(data))
      .catch((error) => console.error("Error fetching crime data:", error));
  }, []);

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        className="map"
        mapId="Crime Map"
        defaultZoom={10}
        defaultCenter={{ lat: 34.0549, lng: -118.2426 }}
      >
        {dataPoints?.map((report) => (
          <MarkerWithInfowindow
            key={report.report_time}
            position={{ lat: report.latitude, lng: report.longitude }}
            title={report.crime_type}
            author={report.user_id}
            time={report.report_time}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
