import {
	Alert,
	AlertTitle,
	Box,
	Card,
	CardContent,
	CardMedia,
	Toolbar,
	Typography,
} from "@mui/material";

import Navbar from "../Components/Navbar";

function AlertBar() {
	return (
		<Box>
			<Alert variant="filled" severity="error">
				<AlertTitle>
					<Typography variant="h4">
						If you are in an emergency situation, call 911 immediately
					</Typography>
				</AlertTitle>
				The non-emergency number for the Los Angeles Police Department (LAPD) is
				(877) 275-5273, also known as 877-ASK-LAPD. This number is available 24
				hours a day in English, Spanish, and TTY.
			</Alert>
		</Box>
	);
}

function ResourceCard({ children, src, title }) {
	return (
		<Box sx={{ padding: 2 }}>
			<Card>
				<CardMedia component="img" alt={title} height={300} image={src} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{children}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}

function ResourceCards() {
	return (
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<ResourceCard
				src={"https://banner2.cleanpng.com/20180425/arq/avenugk09.webp"}
				title={"Neighborhood Watch Programs"}
			>
				Los Angeles Neighborhood Watch Initiative:
				- To join or start a program in your area, contact the Los Angeles Police Department (LAPD) Community Relations Office at your local precinct.
				- More information is available on the LAPDs Neighborhood Watch Page.
				- Attend LAPD-sponsored events or meetings for neighborhood safety planning.
			</ResourceCard>
			<ResourceCard
				src={"https://banner2.cleanpng.com/20180425/arq/avenugk09.webp"}
				title={"Crisis Hotlines"}
			>
				- National Domestic Violence Hotline: 1-800-799-SAFE (7233)
				- Suicide Prevention Lifeline: 988
				- Sexual Assault Hotline: 1-800-656-HOPE
			</ResourceCard>
			<ResourceCard
				title={"Crime Prevention Information"}
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

export default function Resources() {
	return (
		<>
			<Navbar />
			<Toolbar />
			<Box display="flex" justifyContent={"center"}>
				<Typography sx={{ color: "#2196F3" }} variant="h1">
					<b>Resources</b>
				</Typography>
			</Box>

			<AlertBar />
			<ResourceCards />
		</>
	);
}
