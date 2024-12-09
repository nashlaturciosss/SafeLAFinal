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
			SafeLA aims to empower Los Angeles residents with real-time crime updates, provide community-driven reporting, and increase access to essential resources that promote safety and support for all.
			By connecting users with up-to-date information on local incidents and offering a curated page filled with support services, SafeLA fosters a safer, more informed community.
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
