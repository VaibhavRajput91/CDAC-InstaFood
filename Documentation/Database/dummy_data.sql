USE insta_food_database;

-- 1. users table
INSERT INTO users (first_name, last_name, email, password, phone, role) VALUES
-- Admin
('System','Admin','admin@instafood.com','pass','9000000000','ROLE_ADMIN'),

-- Customers (2–21)
('Cust1','Pune','cust1@x.com','pass','9000000001','ROLE_CUSTOMER'),
('Cust2','Pune','cust2@x.com','pass','9000000002','ROLE_CUSTOMER'),
('Cust3','Pune','cust3@x.com','pass','9000000003','ROLE_CUSTOMER'),
('Cust4','Pune','cust4@x.com','pass','9000000004','ROLE_CUSTOMER'),
('Cust5','Pune','cust5@x.com','pass','9000000005','ROLE_CUSTOMER'),
('Cust6','Pune','cust6@x.com','pass','9000000006','ROLE_CUSTOMER'),
('Cust7','Pune','cust7@x.com','pass','9000000007','ROLE_CUSTOMER'),
('Cust8','Pune','cust8@x.com','pass','9000000008','ROLE_CUSTOMER'),

('Cust9','Mumbai','cust9@x.com','pass','9000000009','ROLE_CUSTOMER'),
('Cust10','Mumbai','cust10@x.com','pass','9000000010','ROLE_CUSTOMER'),
('Cust11','Mumbai','cust11@x.com','pass','9000000011','ROLE_CUSTOMER'),
('Cust12','Mumbai','cust12@x.com','pass','9000000012','ROLE_CUSTOMER'),
('Cust13','Mumbai','cust13@x.com','pass','9000000013','ROLE_CUSTOMER'),
('Cust14','Mumbai','cust14@x.com','pass','9000000014','ROLE_CUSTOMER'),

('Cust15','Nagpur','cust15@x.com','pass','9000000015','ROLE_CUSTOMER'),
('Cust16','Nagpur','cust16@x.com','pass','9000000016','ROLE_CUSTOMER'),
('Cust17','Nagpur','cust17@x.com','pass','9000000017','ROLE_CUSTOMER'),
('Cust18','Nagpur','cust18@x.com','pass','9000000018','ROLE_CUSTOMER'),
('Cust19','Nagpur','cust19@x.com','pass','9000000019','ROLE_CUSTOMER'),
('Cust20','Nagpur','cust20@x.com','pass','9000000020','ROLE_CUSTOMER'),

-- Restaurants (22–31)
('Rest1','Pune','r1@x.com','pass','9000000021','ROLE_RESTAURANT'),
('Rest2','Pune','r2@x.com','pass','9000000022','ROLE_RESTAURANT'),
('Rest3','Pune','r3@x.com','pass','9000000023','ROLE_RESTAURANT'),
('Rest4','Mumbai','r4@x.com','pass','9000000024','ROLE_RESTAURANT'),
('Rest5','Mumbai','r5@x.com','pass','9000000025','ROLE_RESTAURANT'),
('Rest6','Mumbai','r6@x.com','pass','9000000026','ROLE_RESTAURANT'),
('Rest7','Nagpur','r7@x.com','pass','9000000027','ROLE_RESTAURANT'),
('Rest8','Nagpur','r8@x.com','pass','9000000028','ROLE_RESTAURANT'),
('Rest9','Nagpur','r9@x.com','pass','9000000029','ROLE_RESTAURANT'),
('Rest10','Nagpur','r10@x.com','pass','9000000030','ROLE_RESTAURANT'),

-- Delivery Partners (32–41)
('DP1','Pune','dp1@x.com','pass','9000000031','ROLE_DELIVERY_PARTNER'),
('DP2','Pune','dp2@x.com','pass','9000000032','ROLE_DELIVERY_PARTNER'),
('DP3','Pune','dp3@x.com','pass','9000000033','ROLE_DELIVERY_PARTNER'),
('DP4','Mumbai','dp4@x.com','pass','9000000034','ROLE_DELIVERY_PARTNER'),
('DP5','Mumbai','dp5@x.com','pass','9000000035','ROLE_DELIVERY_PARTNER'),
('DP6','Mumbai','dp6@x.com','pass','9000000036','ROLE_DELIVERY_PARTNER'),
('DP7','Nagpur','dp7@x.com','pass','9000000037','ROLE_DELIVERY_PARTNER'),
('DP8','Nagpur','dp8@x.com','pass','9000000038','ROLE_DELIVERY_PARTNER'),
('DP9','Nagpur','dp9@x.com','pass','9000000039','ROLE_DELIVERY_PARTNER'),
('DP10','Nagpur','dp10@x.com','pass','9000000040','ROLE_DELIVERY_PARTNER');


-- 2. addresses table
INSERT INTO address (user_id, city, postal_code, line_one, state) VALUES
-- Pune (411001)
(2,'Pune','411001','Shivaji Nagar','MH'),
(3,'Pune','411001','Kothrud','MH'),
(4,'Pune','411001','Baner','MH'),
(5,'Pune','411001','Aundh','MH'),
(6,'Pune','411001','Hadapsar','MH'),
(7,'Pune','411001','Wakad','MH'),
(8,'Pune','411001','Hinjewadi','MH'),
(9,'Pune','411001','Karve Nagar','MH'),
(22,'Pune','411001','FC Road','MH'),
(23,'Pune','411001','JM Road','MH'),
(24,'Pune','411001','Camp','MH'),
(32,'Pune','411001','Pimple Saudagar','MH'),
(33,'Pune','411001','Nigdi','MH'),
(34,'Pune','411001','Chinchwad','MH'),

-- Mumbai (400001)
(10,'Mumbai','400001','Andheri','MH'),
(11,'Mumbai','400001','Bandra','MH'),
(12,'Mumbai','400001','Malad','MH'),
(13,'Mumbai','400001','Borivali','MH'),
(14,'Mumbai','400001','Powai','MH'),
(15,'Mumbai','400001','Dadar','MH'),
(25,'Mumbai','400001','Lower Parel','MH'),
(26,'Mumbai','400001','Colaba','MH'),
(27,'Mumbai','400001','Kurla','MH'),
(35,'Mumbai','400001','Goregaon','MH'),
(36,'Mumbai','400001','Vikhroli','MH'),
(37,'Mumbai','400001','Chembur','MH'),

-- Nagpur (440001)
(16,'Nagpur','440001','Dharampeth','MH'),
(17,'Nagpur','440001','Sitabuldi','MH'),
(18,'Nagpur','440001','Trimurti Nagar','MH'),
(19,'Nagpur','440001','Manewada','MH'),
(20,'Nagpur','440001','Sadar','MH'),
(21,'Nagpur','440001','Civil Lines','MH'),
(28,'Nagpur','440001','Ramdaspeth','MH'),
(29,'Nagpur','440001','Nandanvan','MH'),
(30,'Nagpur','440001','Mankapur','MH'),
(31,'Nagpur','440001','Jaripatka','MH'),
(38,'Nagpur','440001','Koradi','MH'),
(39,'Nagpur','440001','Hingna','MH'),
(40,'Nagpur','440001','Wardha Rd','MH'),
(41,'Nagpur','440001','Kamptee Rd','MH');


-- 3. restaurants table
INSERT INTO restaurants (user_id, restaurant_name, opening_time, closing_time, status) VALUES
(22,'Pune Spice','09:00','23:00','AVAILABLE'),
(23,'Urban Tadka','10:00','22:00','AVAILABLE'),
(24,'Green Bowl','08:00','21:00','AVAILABLE'),
(25,'Mumbai Masala','10:00','23:00','AVAILABLE'),
(26,'Sea Breeze','11:00','23:59','AVAILABLE'),
(27,'Burger Hub','10:00','22:00','AVAILABLE'),
(28,'Nagpur Tandoor','09:00','22:00','AVAILABLE'),
(29,'Desi Zaika','10:00','22:30','AVAILABLE'),
(30,'Chinese Wok','11:00','23:00','AVAILABLE'),
(31,'Pasta Street','10:00','22:00','AVAILABLE');


-- 4. delivery partner table
INSERT INTO delivery_partners
(user_id, license_number, model, vehicle_type)
VALUES
(32,'MH12DP1001','Hero Splendor','BIKE'),
(33,'MH12DP1002','Bajaj Pulsar','BIKE'),
(34,'MH12DP1003','TVS Jupiter','SCOOTER'),

(35,'MH01DP1004','Honda Shine','BIKE'),
(36,'MH01DP1005','TVS Apache','BIKE'),
(37,'MH01DP1006','Hercules Street','BICYCLE'),

(38,'MH49DP1007','Royal Enfield Classic','BIKE'),
(39,'MH49DP1008','Suzuki Access','SCOOTER'),
(40,'MH49DP1009','Tata Tiago EV','EV'),
(41,'MH49DP1010','Maruti Alto','CAR');



-- 5. menus table
INSERT INTO menus (restaurant_id, is_active) VALUES
(1,true),(2,true),(3,true),(4,true),(5,true),
(6,true),(7,true),(8,true),(9,true),(10,true);

-- 6. categories table
INSERT INTO categories (name) VALUES
('PIZZA'),('BURGER'),('PASTA'),('NOODLES'),
('PANEER'),('CHEESE'),('FAST_FOOD'),
('VEGAN'),('CHINESE'),('INDIAN');

-- 7. dishes table
INSERT INTO dishes (restaurant_id, name) VALUES
(1,'Margherita Pizza'),
(1,'Paneer Tikka'),
(2,'Veg Burger'),
(2,'Cheese Burger'),
(3,'Pasta Alfredo'),
(3,'Veg Salad'),
(4,'Butter Chicken'),
(4,'Paneer Butter Masala'),
(5,'Fish Curry'),
(5,'Prawn Masala'),
(6,'Chicken Burger'),
(6,'Veg Wrap'),
(7,'Dal Makhani'),
(7,'Paneer Bhurji'),
(8,'Veg Biryani'),
(8,'Chicken Biryani'),
(9,'Hakka Noodles'),
(9,'Manchurian'),
(10,'White Sauce Pasta'),
(10,'Red Sauce Pasta'),
(1,'Cheese Pizza'),
(2,'Vegan Burger'),
(3,'Garlic Bread'),
(4,'Naan'),
(5,'Rice Bowl'),
(6,'Fries'),
(7,'Tandoori Roti'),
(8,'Curd Rice'),
(9,'Spring Roll'),
(10,'Lasagna');


-- 8. dishes category mapping table
INSERT INTO dish_categories VALUES
(1,1),(1,6),(1,7),
(3,2),(3,7),
(22,2),(22,8),
(5,3),(5,6),
(17,4),(17,9),
(8,5),(8,10);


-- 9. menu dishes table
INSERT INTO menu_dishes (dish_id, menu_id, description, price) VALUES
(1,1,'Classic pizza',299),
(2,1,'Spicy paneer',249),
(3,2,'Crispy burger',199),
(4,2,'Cheese loaded',249),
(5,3,'Creamy pasta',299),
(6,3,'Healthy bowl',199),
(7,4,'Punjabi classic',349),
(8,4,'Rich gravy',299),
(9,5,'Seafood curry',399),
(10,5,'Prawn delight',449);


-- 10. orders table
INSERT INTO orders
(order_id, customer_id, restaurant_id, delivery_partner_id, order_status, total_amount)
VALUES
(1,2,1,1,'DELIVERED',548),
(2,3,2,2,'DELIVERED',448),
(3,4,3,1,'DELIVERED',498),
(4,5,4,3,'DELIVERED',648),
(5,6,5,4,'DELIVERED',848),
(6,7,6,5,'DELIVERED',399),
(7,8,7,6,'DELIVERED',299),
(8,9,8,7,'DELIVERED',449),
(9,10,9,4,'DELIVERED',399),
(10,11,10,5,'DELIVERED',349),

(11,12,1,2,'DELIVERED',299),
(12,13,2,3,'DELIVERED',249),
(13,14,3,1,'DELIVERED',199),
(14,15,4,6,'DELIVERED',399),
(15,16,5,7,'DELIVERED',449),
(16,17,6,8,'DELIVERED',199),
(17,18,7,9,'DELIVERED',249),
(18,19,8,10,'DELIVERED',299),
(19,20,9,8,'DELIVERED',349),
(20,21,10,9,'DELIVERED',299);


-- 11. order_items table
INSERT INTO order_items
(order_id, dish_id, quantity, price)
VALUES
(1,1,1,299),(1,2,1,249),
(2,3,2,199),
(3,5,1,299),(3,6,1,199),
(4,7,1,349),(4,8,1,299),
(5,9,1,399),(5,10,1,449),
(6,11,2,199),
(7,13,1,199),(7,14,1,99),
(8,15,1,249),(8,16,1,199),
(9,17,1,249),(9,18,1,150),
(10,19,1,349),

(11,21,1,299),
(12,4,1,249),
(13,6,1,199),
(14,8,1,299),(14,7,1,100),
(15,10,1,449),
(16,12,1,199),
(17,14,1,249),
(18,15,1,299),
(19,18,1,349),
(20,20,1,299);


-- 12. payments table
-- INSERT INTO payments
-- (order_id, payment_method, payment_status)
-- VALUES
-- (1,'UPI','SUCCESS'),
-- (2,'CARD','SUCCESS'),
-- (3,'UPI','SUCCESS'),
-- (4,'CARD','SUCCESS'),
-- (5,'UPI','SUCCESS'),
-- (6,'COD','SUCCESS'),
-- (7,'UPI','SUCCESS'),
-- (8,'CARD','SUCCESS'),
-- (9,'UPI','SUCCESS'),
-- (10,'CARD','SUCCESS'),
-- (11,'UPI','SUCCESS'),
-- (12,'CARD','SUCCESS'),
-- (13,'UPI','SUCCESS'),
-- (14,'COD','SUCCESS'),
-- (15,'UPI','SUCCESS'),
-- (16,'CARD','SUCCESS'),
-- (17,'UPI','SUCCESS'),
-- (18,'CARD','SUCCESS'),
-- (19,'UPI','SUCCESS'),
-- (20,'CARD','SUCCESS');


-- 13. delivery_logs table
INSERT INTO delivery_logs
(order_id, delivery_partner_id, delivery_status)
VALUES
(1,1,'ASSIGNED'),
(1,1,'PICKED_UP'),
(1,1,'DELIVERED'),

(2,2,'ASSIGNED'),
(2,2,'DELIVERED'),

(3,1,'ASSIGNED'),
(3,1,'DELIVERED'),

(4,3,'ASSIGNED'),
(4,3,'DELIVERED'),

(5,4,'ASSIGNED'),
(5,4,'DELIVERED'),

(6,5,'ASSIGNED'),
(6,5,'DELIVERED'),

(7,6,'ASSIGNED'),
(7,6,'DELIVERED'),

(8,7,'ASSIGNED'),
(8,7,'DELIVERED'),

(9,4,'ASSIGNED'),
(9,4,'DELIVERED'),

(10,5,'ASSIGNED'),
(10,5,'DELIVERED');


-- 14. reviews table
INSERT INTO reviews
(review_for, order_id, reviewer_id, rating, notes)
VALUES
('RESTAURANT_REVIEW',1,2,5,'Amazing food'),
('DELIVERY_PARTNER_REVIEW',1,2,5,'Fast delivery'),

('RESTAURANT_REVIEW',2,3,4,'Good taste'),
('DELIVERY_PARTNER_REVIEW',2,3,4,'Polite partner'),

('RESTAURANT_REVIEW',3,4,5,'Loved it'),
('DELIVERY_PARTNER_REVIEW',3,4,5,'Quick service'),

('RESTAURANT_REVIEW',4,5,4,'Nice portions'),
('DELIVERY_PARTNER_REVIEW',4,5,5,'On time'),

('RESTAURANT_REVIEW',5,6,5,'Worth the price'),
('DELIVERY_PARTNER_REVIEW',5,6,4,'Good handling'),

('RESTAURANT_REVIEW',6,7,4,'Decent'),
('RESTAURANT_REVIEW',7,8,5,'Excellent'),
('RESTAURANT_REVIEW',8,9,4,'Good quality'),
('RESTAURANT_REVIEW',9,10,5,'Tasty'),
('RESTAURANT_REVIEW',10,11,4,'Nice');