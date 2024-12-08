import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Resources from "./Page/Resources";
import AboutUs from "./Page/AboutUs";
import Report from "./Page/Report";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/resources" element={<Resources />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/report" element={<Report />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
