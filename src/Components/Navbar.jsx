import {
	AppBar,           // Import AppBar component for creating a top navigation bar
	Box,              // Box component for flexible container layouts
	Container,        // Container component to center content with fixed width
	IconButton,       // IconButton component for clickable icon buttons
	MenuItem,         // MenuItem component to display each navigation item
	Toolbar,          // Toolbar component for organizing elements within the AppBar
	Typography,       // Typography component for consistent text styling
  } from "@mui/material";  // Material-UI library for styled components
  
  import { Link } from "react-router-dom";  // Link component from React Router for navigation without page reload
  
  // Defining the pages and their URLs in an array for easy rendering
  const Pages = [
	{ name: "Home", url: "/" },           // Home page route
	{ name: "Resources", url: "/resources" },  // Resources page route
	{ name: "About us", url: "/about-us" },   // About us page route
	{ name: "Report", url: "/report" },       // Report page route
  ];
  
  // Navbar component to display the top navigation bar
  export default function Navbar() {
	return (
	  <Box> {/* Box wrapper for layout */}
		<AppBar position="fixed"> {/* AppBar component for the navigation bar, fixed to the top */}
		  <Container> {/* Container to center and contain the AppBar content */}
			<Toolbar variant="regular"> {/* Toolbar for placing elements within the AppBar */}
			  {/* IconButton for displaying a clickable logo */}
			  <IconButton
				size="large"        // Set icon button size to large
				edge="start"        // Position the icon at the start (left) of the toolbar
				color="inherit"     // Use inherited color (white)
				aria-label="menu"   // Accessibility label for the menu
				sx={{ mr: 2 }}       // Apply margin-right to space out the button
			  >
				<img src="src/assets/react.svg" alt="React logo" />  {/* React logo as the menu icon */}
			  </IconButton>
  
			  {/* Render the navigation links dynamically from the Pages array */}
			  {Pages.map((page) => {
				return (
				  <MenuItem key={page.name} component={Link} to={page.url}> {/* Menu item with a link to page URL */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					  {page.name} {/* Page name displayed as text */}
					</Typography>
				  </MenuItem>
				);
			  })}
			</Toolbar>
		  </Container>
		</AppBar>
	  </Box>
	);
  }
  