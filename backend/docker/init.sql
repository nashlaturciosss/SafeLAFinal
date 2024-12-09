CREATE TABLE IF NOT EXISTS locations (
  location_id SERIAL PRIMARY KEY,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address VARCHAR(255),
  report_time TIMESTAMPTZ DEFAULT now(),
  crime_type VARCHAR(255),
  user_id INT
);

-- Insert fake crime data for testing
INSERT INTO locations (latitude, longitude, address, crime_type, user_id)
VALUES
  (34.052235, -118.243683, '123 Main St, Los Angeles, CA 90001', 'Burglary', 1),
  (34.052706, -118.243893, '456 Oak Ave, Los Angeles, CA 90002', 'Assault', 2),
  (34.050836, -118.246512, '789 Pine Blvd, Los Angeles, CA 90003', 'Robbery', 3),
  (34.048652, -118.244568, '101 Maple St, Los Angeles, CA 90004', 'Vandalism', 4),
  (34.055104, -118.250440, '202 Cedar Rd, Los Angeles, CA 90005', 'Fraud', 5),
  (34.058349, -118.247234, '303 Birch St, Los Angeles, CA 90006', 'Arson', 6),
  (34.053645, -118.249122, '404 Elm Ave, Los Angeles, CA 90007', 'Drug Offense', 7),
  (34.054456, -118.240158, '505 Willow Dr, Los Angeles, CA 90008', 'Theft', 8),
  (34.056789, -118.242455, '606 Redwood Ln, Los Angeles, CA 90009', 'Battery', 9),
  (34.051872, -118.245788, '707 Spruce St, Los Angeles, CA 90010', 'Murder', 10),
  (34.057024, -118.248003, '808 Palm Rd, Los Angeles, CA 90011', 'Sexual Assault', 11),
  (34.059231, -118.251102, '909 Ash Ave, Los Angeles, CA 90012', 'Kidnapping', 12),
  (34.060528, -118.253403, '1010 Magnolia St, Los Angeles, CA 90013', 'Hate Crime', 13),
  (34.062713, -118.254669, '1111 Rose Ln, Los Angeles, CA 90014', 'Public Drunkenness', 14),
  (34.063915, -118.256732, '1212 Jasmine Blvd, Los Angeles, CA 90015', 'Trespassing', 15);
