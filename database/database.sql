CREATE DATABASE user_auth;

USE user_auth;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  price VARCHAR(50),
  link VARCHAR(255)
);

INSERT INTO rooms (image, title, description, price, link)
VALUES
-- 1
(
  'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg',
  'Cozy Studio Apartment',
  'Perfect for students. Includes Wi-Fi, water, and electricity.',
  'Rs. 15,000/month',
  'https://example.com/studio-apartment'
),
-- 2
(
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
  'Spacious 2BHK Flat',
  'Ideal for families with ample parking and security.',
  'Rs. 30,000/month',
  'https://example.com/2bhk-flat'
),
-- 3
(
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  'Single Room for Rent',
  'Affordable and comfortable room for working professionals.',
  'Rs. 10,000/month',
  'https://example.com/single-room'
),
-- 4
(
  'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
  'Luxury 3BHK Penthouse',
  'Fully furnished with a beautiful view of the city skyline.',
  'Rs. 50,000/month',
  'https://example.com/luxury-penthouse'
),
-- 5
(
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  'Modern 1BHK Apartment',
  'Newly renovated, comes with modern kitchen and balcony.',
  'Rs. 20,000/month',
  'https://example.com/1bhk-modern'
),
-- 6
(
  'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg',
  'Budget-Friendly Room',
  'Best for students and travelers. Peaceful neighborhood.',
  'Rs. 8,000/month',
  'https://example.com/budget-room'
),
-- 7
(
  'https://images.pexels.com/photos/259984/pexels-photo-259984.jpeg',
  'Shared Room in Apartment',
  'Affordable shared space with access to kitchen and bathroom.',
  'Rs. 6,500/month',
  'https://example.com/shared-room'
),
-- 8
(
  'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
  'Furnished 2BHK Flat',
  'Includes furniture, air conditioning, and balcony.',
  'Rs. 28,000/month',
  'https://example.com/furnished-2bhk'
),
-- 9
(
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
  'Peaceful Cottage',
  'Located in a quiet neighborhood with garden and parking.',
  'Rs. 18,000/month',
  'https://example.com/peaceful-cottage'
),
-- 10
(
  'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg',
  'Stylish Duplex Apartment',
  'Modern duplex with two floors and elegant interiors.',
  'Rs. 35,000/month',
  'https://example.com/duplex-apartment'
),
-- 11
(
  'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
  'Single Room with Attached Bathroom',
  'Includes bed, study table, and personal bathroom.',
  'Rs. 11,000/month',
  'https://example.com/attached-bathroom-room'
),
-- 12
(
  'https://images.pexels.com/photos/271637/pexels-photo-271637.jpeg',
  '3BHK Villa with Garden',
  'Spacious villa with private lawn, ideal for families.',
  'Rs. 45,000/month',
  'https://example.com/3bhk-villa'
),
-- 13
(
  'https://images.pexels.com/photos/703140/pexels-photo-703140.jpeg',
  'Modern Loft Apartment',
  'Stylish and compact loft ideal for digital nomads.',
  'Rs. 22,000/month',
  'https://example.com/loft-apartment'
),
-- 14
(
  'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg',
  'Vintage Room in Heritage Home',
  'Old-style room with wooden interiors and charm.',
  'Rs. 9,000/month',
  'https://example.com/vintage-room'
),
-- 15
(
  'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg',
  'Couple-Friendly Apartment',
  '1BHK ideal for young couples. Pet-friendly.',
  'Rs. 17,000/month',
  'https://example.com/couple-apartment'
),
-- 16
(
  'https://images.pexels.com/photos/280207/pexels-photo-280207.jpeg',
  'Compact PG Room',
  'Includes 2 meals/day and housekeeping.',
  'Rs. 7,500/month',
  'https://example.com/pg-room'
),
-- 17
(
  'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg',
  'Top Floor 2BHK',
  'Great city view, lift access, and rooftop space.',
  'Rs. 32,000/month',
  'https://example.com/top-floor-2bhk'
),
-- 18
(
  'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
  'Semi-Furnished 1BHK',
  'Comes with sofa, bed, and wardrobe. Geyser included.',
  'Rs. 14,000/month',
  'https://example.com/semi-1bhk'
),
-- 19
(
  'https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg',
  'Room Near College',
  'Walking distance to university. Best for students.',
  'Rs. 9,500/month',
  'https://example.com/near-college-room'
),
-- 20
(
  'https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg',
  'Luxury Studio in High-Rise',
  'Fully furnished with city view and high-speed internet.',
  'Rs. 25,000/month',
  'https://example.com/luxury-studio'
);
