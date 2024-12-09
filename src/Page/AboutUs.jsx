import { Box, Button, Paper, Toolbar, Typography } from "@mui/material"; // Import Material-UI components
import Navbar from "../Components/Navbar"; // Import the Navbar component for the page header
import { Link } from "react-router-dom"; // Import Link component from React Router for navigation

// AboutUs page component that displays information about the SafeLA project
export default function AboutUs() {
  return (
    <>
      {/* Render the Navbar at the top of the page */}
      <Navbar />
      
      <Toolbar /> {/* Toolbar to create space below the navbar (empty for visual structure) */}

      {/* Box container to center the title "Who are We?" */}
      <Box display="flex" justifyContent={"center"}>
        <Typography sx={{ color: "#2196F3" }} variant="h1"> {/* Display the page title in blue */}
          <b>Who are We?</b> {/* Bold title text */}
        </Typography>
      </Box>

      {/* Paragraph explaining the mission and purpose of SafeLA */}
      <Typography sx={{ m: 2 }}>
        SafeLA aims to empower Los Angeles residents with real-time crime updates, 
        provide community-driven reporting, and increase access to essential resources 
        that promote safety and support for all.
        By connecting users with up-to-date information on local incidents and offering 
        a curated page filled with support services, SafeLA fosters a safer, more informed community.
      </Typography>

      {/* Paper component used for a background section that holds additional information */}
      <Paper sx={{ padding: 10, background: "#CFD8DC", height: "2000" }}> 
        {/* Box to create a flexible layout with a row direction */}
        <Box display="flex" flexDirection="row">
        
          {/* Box for the text content of SafeLA */}
          <Box
            sx={{ display: "flex", flex: "3 1 0", alignItems: "center" }}  // Flexbox layout for content alignment
            alignItems="center"
          >
            <Box>
              {/* Typography for the SafeLA brand name */}
              <Typography variant="h3" sx={{ color: "#2196F3" }}>
                <b>SafeLA</b> {/* Bold SafeLA title */}
              </Typography>
              {/* Typography for a short description of SafeLA's mission */}
              <Typography>
                Keeping the greater Los Angeles area safe, informed, and educated.
              </Typography>
              
              {/* Button that links to the "Report" page where users can report crimes */}
              <Button component={Link} to="/report" sx={{ my: 2 }} variant="contained">
                Report {/* Button text */}
              </Button>
            </Box>
          </Box>

          {/* Image showcasing SafeLA's theme or mission */}
          <img src="https://images.desenio.com/zoom/8718_2.jpg" height={500} /> {/* Image of a neighborhood or community */}
        </Box>
      </Paper>
    </>
  );
}
