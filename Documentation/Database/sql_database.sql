-- ======================
DROP SCHEMA insta_food_database;
CREATE SCHEMA IF NOT EXISTS insta_food_database;
USE insta_food_database;
-- ======================

-- 1. users table
CREATE TABLE users (
	user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role ENUM('ROLE_CUSTOMER', 'ROLE_RESTAURANT', 'ROLE_ADMIN', 'ROLE_DELIVERY_PARTNER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. addresses table
CREATE TABLE address (
	address_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    line_one VARCHAR(150) NOT NULL,
    line_two VARCHAR(150),
    state VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 3. restaurant table
CREATE TABLE restaurants (
	restaurant_id BIGINT auto_increment primary key,
    user_id BIGINT not null,
    restaurant_name varchar(150) not null,
    closing_time time not null,
    opening_time time not null,
    status enum('AVAILABLE', 'UNAVAILABLE', 'INACTIVE'),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (user_id) references users(user_id)
);

-- 4. deliery partner table
create table delivery_partners(
	delivery_partner_id BIGINT auto_increment primary key,
    user_id BIGINT not null unique,
    license_number varchar(20) not null unique,
    model varchar(50) not null,
    vehicle_type enum('BICYCLE', 'BIKE', 'SCOOTER', 'CAR', 'EV'),
    status enum('AVAILABLE', 'UNAVAILABLE', 'INACTIVE'),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (user_id) references users(user_id)
);

-- 5. menu table
create table menus(
	menu_id BIGINT auto_increment primary key,
    restaurant_id BIGINT not null unique,
    is_active boolean not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (restaurant_id) references restaurants(restaurant_id)
);

-- 6. dishes table
CREATE TABLE dishes (
    dish_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_dish_name (name),
);

-- 7. categories table
CREATE TABLE categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 8. dish categories table
CREATE TABLE dish_categories (
    dish_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,

    PRIMARY KEY (dish_id, category_id),

    FOREIGN KEY (dish_id) REFERENCES dishes(dish_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- 9. menus and dishes join table
create table menu_dishes(
	dish_id BIGINT not null,
    menu_id BIGINT not null,
    description varchar(255),
    price double not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (dish_id) references dishes(dish_id),
    foreign key (menu_id) references menus(menu_id)
);

-- 10. orders table
create table orders(
	order_id BIGINT auto_increment primary key,
    customer_id BIGINT not null,
    delivery_partner_id BIGINT not null,
    restaurant_id BIGINT not null,
    order_status enum('ACCEPTED', 'DELIVERED', 'CANCELLED'),
    total_amount double not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (customer_id) references users(user_id),
    foreign key (restaurant_id) references restaurants(restaurant_id),
    foreign key (delivery_partner_id) references delivery_partners(delivery_partner_id)
);

-- 11. payments table
create table payments (
	payment_id BIGINT auto_increment primary key,
    order_id BIGINT not null,
    payment_method enum('CASH','UPI', 'CARD') not null,
    payment_status enum('PENDING', 'PAID', 'FAILED') not null,    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (order_id) references orders(order_id)
);

-- 12. order items table
create table order_items(
	order_item_id BIGINT auto_increment primary key,
    quantity integer not null check(quantity <= 10),
    price double not null,
    dish_id BIGINT not null,
    order_id BIGINT not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (order_id) references orders(order_id),
    foreign key (dish_id) references dishes(dish_id)
);

-- 13. reviews table
create table reviews (
	review_id BIGINT auto_increment primary key,
    review_for enum('RESTAURANT_REVIEW', 'DELIVERY_PARTNER_REVIEW'),
    order_id BIGINT not null,
    reviewer_id BIGINT not null,
    rating int,
    notes varchar(300),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (order_id) references orders(order_id),
    foreign key (reviewer_id) references users(user_id)
);

-- 14. delivery logs table
create table delivery_logs(
	log_id BIGINT auto_increment primary key,
    delivery_partner_id BIGINT not null,
    order_id BIGINT not null,
    delivery_status enum('ASSIGNED', 'PICKED_UP', 'DELIVERED', 'CANCELLED') not null,
    notes varchar(150),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    
    foreign key (delivery_partner_id) references delivery_partners(delivery_partner_id),
    foreign key (order_id) references orders(order_id)
);