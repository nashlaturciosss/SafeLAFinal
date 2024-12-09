SafeLA Crime Reporting Application:

SafeLA is a React-based platform for viewing up-to-date crime and reporting live activity on an interactive map. It has an interactive interface for users to explore a crime map, access local resources and tips, and report incidents directly using a form.

Features:

- Interactive crime map for visualizing data.
- Report page for submitting crime information, including location and details.
- Dynamic navigation using React Router.
- Google Maps API integration

Getting started with SafeLA:

These need to be installed on your system for our SafeLA application to work: 
- Node.js
- npm (Node Package Manager)

Installation:

1. Clone the repository:
   git clone <repository-url>
   cd <repository-folder>

2. Install dependencies:
npm install
3. Set up your Google Maps API key:
Create a .env file in the root of the project.
Add the following line to the .env file:
makefile
Copy code
VITE_MAPS_API_KEY=your-google-maps-api-key
Run Application:
Use the command: npm run dev
This command launches the application on a local development server.

Page descriptions:
Main.jsx: The Entry point for React that sets up the root component.
App.jsx: Main application file that has the route definitions.
Home.jsx: The home page features a crime map and navigation bar.
Report.jsx: Users can report crimes using a form and it will populate to the map using the Google Maps integration.
Components/: Shared components across the application, such as Navbar and CrimeMap.

How to use SafeLA:
On the homepage, you will find a display of a map of crimes using Google Maps. You can click on the navigation bars elements to go to other pages. On the Report page, users will enter latitude and longitude values, the type of crime, crime date and time, and other details about the crime, and users must click submit. The Resources and About Us pages are static because we simply provide users with information about our mission, as well as tips to keep themselves safe, neighborhood watch programs, and crisis hotlines.



Youtube link: 

