import { Box, Button, Paper, Toolbar, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

export default function AboutUs() {
	return (
		<>
			<Navbar />
			<Toolbar />
			<Box display="flex" justifyContent={"center"}>
				<Typography sx={{ color: "#2196F3" }} variant="h1">
					<b>Who are We?</b>
				</Typography>
			</Box>
			<Typography sx={{ m: 2 }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
				non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Typography>
			<Paper sx={{ padding: 10, background: "#CFD8DC", height: "2000" }}>
				<Box display="flex" flexDirection="row">
					<Box
						sx={{ display: "flex", flex: "3 1 0", alignItems: "center" }}
						alignItems="center"
					>
						<Box>
							<Typography variant="h3" sx={{ color: "#2196F3" }}>
								<b>SafeLA</b>
							</Typography>
							<Typography>
								Keeping the greater los angeles area safe, informed, and educated.
							</Typography>
							<Button component={Link} to="/report" sx={{ my: 2 }} variant="contained">
								Report
							</Button>
						</Box>
					</Box>
					<img src="https://images.desenio.com/zoom/8718_2.jpg" height={500} />
				</Box>
			</Paper>
		</>
	);
}
