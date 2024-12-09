import {
	Alert,             // Alert component for displaying alert messages
	AlertTitle,        // AlertTitle component for the title part of the Alert
	Box,               // Box component for layout and styling
	Card,              // Card component for wrapping content in a card layout
	CardContent,       // CardContent component to hold content inside the Card
	CardMedia,         // CardMedia component for displaying media like images or videos in the card
	Toolbar,           // Toolbar component for spacing and layout
	Typography,        // Typography component for consistent text styles
  } from "@mui/material"; // Material-UI components for styling
  
  import Navbar from "../Components/Navbar"; // Import the Navbar component for the page header
  
  // AlertBar component to display an emergency alert message at the top of the page
  function AlertBar() {
	return (
	  <Box>
		<Alert variant="filled" severity="error"> {/* Alert with 'error' severity for emergency message */}
		  <AlertTitle> {/* Title of the alert */}
			<Typography variant="h4">
			  If you are in an emergency situation, call 911 immediately
			</Typography>
		  </AlertTitle>
		  {/* Additional message providing the non-emergency LAPD contact number */}
		  The non-emergency number for the Los Angeles Police Department (LAPD) is
		  (877) 275-5273, also known as 877-ASK-LAPD. This number is available 24
		  hours a day in English, Spanish, and TTY.
		</Alert>
	  </Box>
	);
  }
  
  // ResourceCard component to display a card with an image, title, and content
  function ResourceCard({ children, src, title }) {
	return (
	  <Box sx={{ padding: 2 }}>  {/* Box for adding padding around the card */}
		<Card>  {/* Card for the resource */}
		  <CardMedia component="img" alt={title} height={300} image={src} /> {/* Image for the card */}
		  <CardContent>  {/* Content inside the card */}
			<Typography gutterBottom variant="h5" component="div">
			  {title}  {/* Title of the resource */}
			</Typography>
			<Typography variant="body2" sx={{ color: "text.secondary" }}>
			  {children}  {/* Children (text content) passed as prop */}
			</Typography>
		  </CardContent>
		</Card>
	  </Box>
	);
  }
  
  // ResourceCards component to render multiple ResourceCard components in a row
  function ResourceCards() {
	return (
	  <Box
		display="flex"
		flexDirection="row"   // Arrange the cards in a row
		justifyContent="space-between"  // Space the cards evenly
		alignItems="center"   // Align the cards vertically in the center
	  >
		{/* Individual ResourceCard components with different content */}
		<ResourceCard
		  src={"https://banner2.cleanpng.com/20180425/arq/avenugk09.webp"} // Image URL
		  title={"Neighborhood Watch Programs"}
		>
		  Los Angeles Neighborhood Watch Initiative:
		  - To join or start a program in your area, contact the Los Angeles Police Department (LAPD) Community Relations Office at your local precinct.
		  - More information is available on the LAPD&rsquo;s Neighborhood Watch Page.
		  - Attend LAPD-sponsored events or meetings for neighborhood safety planning.
		</ResourceCard>
		<ResourceCard
		  src={"https://banner2.cleanpng.com/20180425/arq/avenugk09.webp"} // Same image for different content
		  title={"Crisis Hotlines"}
		>
		  - National Domestic Violence Hotline: 1-800-799-SAFE (7233)
		  - Suicide Prevention Lifeline: 988
		  - Sexual Assault Hotline: 1-800-656-HOPE
		</ResourceCard>
		<ResourceCard
		  title={"Crime Prevention Information"}  // No image provided for this card
		>
		  Home and Vehicle Security:
			- Always lock your doors and windows when leaving home or your vehicle.
			- Use security cameras and motion-sensor lights where possible.
			- Do not leave valuables in plain sight in vehicles.
  
		  Personal Safety Tips:
			- Avoid walking alone at night in poorly lit areas.
			- Stay aware of your surroundings, especially in crowded places.
			- When traveling, share your route with a trusted person.
			- Use caution while sharing personal information online.
		</ResourceCard>
	  </Box>
	);
  }
  
  // Resources page component to display resources and alert bar
  export default function Resources() {
	return (
	  <>
		{/* Navbar component to display the page's header */}
		<Navbar />
		<Toolbar /> {/* Toolbar for layout spacing */}
  
		{/* Box container to center the page's title */}
		<Box display="flex" justifyContent={"center"}>
		  <Typography sx={{ color: "#2196F3" }} variant="h1">
			<b>Resources</b> {/* Page title */}
		  </Typography>
		</Box>
  
		{/* Emergency alert bar at the top */}
		<AlertBar />
		{/* Display the list of resource cards */}
		<ResourceCards />
	  </>
	);
  }
  