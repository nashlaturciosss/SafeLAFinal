import {
	AppBar,
	Box,
	Container,
	IconButton,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Pages = [
	{ name: "Home", url: "/" },
	{ name: "Resources", url: "/resources" },
	{ name: "About us", url: "/about-us" },
	{ name: "Report", url: "/report" },
];

export default function Navbar() {
	return (
		<Box>
			<AppBar position="fixed">
				<Container>
					<Toolbar variant="regular">
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<img src="src/assets/react.svg" />
						</IconButton>
						{Pages.map((page) => {
							return (
								<MenuItem key={page.name} component={Link} to={page.url}>
									<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
										{page.name}
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
