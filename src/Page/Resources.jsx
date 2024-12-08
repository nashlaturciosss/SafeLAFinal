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
				title={"Hello World"}
			>
				Wow we have an important description here of things to do and stuff and
				things and other things such that this is a text that is meant to be in
				place for something
			</ResourceCard>
			<ResourceCard
				src={"https://banner2.cleanpng.com/20180425/arq/avenugk09.webp"}
				title={"Hello World"}
			>
				Wow we have an important description here of things to do and stuff and
				things and other things such that this is a text that is meant to be in
				place for something
			</ResourceCard>
			<ResourceCard
				src={"https://banner2.cleanpng.com/20180425/arq/avenugk09.webp"}
				title={"Hello World"}
			>
				Wow we have an important description here of things to do and stuff and
				things and other things such that this is a text that is meant to be in
				place for something
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
