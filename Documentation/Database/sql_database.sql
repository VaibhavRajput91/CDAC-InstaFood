-- ======================
CREATE SCHEMA IF NOT EXISTS insta_food_database;
USE insta_food_database;
-- ======================

-- 1. users table
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),

    email VARCHAR(254) NOT NULL,
    phone VARCHAR(15) NOT NULL,

    password VARCHAR(255) NOT NULL,

    role ENUM(
        'ROLE_CUSTOMER',
        'ROLE_RESTAURANT',
        'ROLE_ADMIN',
        'ROLE_DELIVERY_PARTNER'
    ) NOT NULL,

    profile_picture_url LONGBLOB,

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    UNIQUE KEY uk_users_email (email),
    UNIQUE KEY uk_users_phone (phone),
    INDEX idx_users_role (role)
);

-- 2. addresses table
CREATE TABLE address (
    address_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL UNIQUE,

    line_one VARCHAR(150) NOT NULL,
    line_two VARCHAR(150),

    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_address_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    INDEX idx_address_postal_code (postal_code),
    INDEX idx_address_city (city)
);


-- 3. restaurant table
CREATE TABLE restaurants (
    restaurant_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL UNIQUE,

    restaurant_name VARCHAR(150) NOT NULL,

    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,

    restaurant_image LONGBLOB,

    status ENUM(
        'AVAILABLE',
        'UNAVAILABLE',
        'INACTIVE',
        'PENDING',
        'REJECTED'
    ) NOT NULL DEFAULT 'PENDING',

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_restaurant_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    INDEX idx_restaurant_status (status)
);


-- 4. deliery partner table
CREATE TABLE delivery_partners (
    delivery_partner_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL UNIQUE,

    license_number VARCHAR(20) NOT NULL UNIQUE,
    model VARCHAR(50) NOT NULL,

    vehicle_type ENUM(
        'BICYCLE',
        'BIKE',
        'SCOOTER',
        'CAR',
        'EV'
    ) NOT NULL,

    status ENUM(
        'AVAILABLE',
        'UNAVAILABLE',
        'INACTIVE',
        'PENDING',
        'REJECTED'
    ) NOT NULL DEFAULT 'PENDING',

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_delivery_partner_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    INDEX idx_delivery_partner_status (status),
    INDEX idx_delivery_partner_vehicle (vehicle_type)
);


-- 5. menu table
CREATE TABLE menus (
    menu_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    restaurant_id BIGINT NOT NULL UNIQUE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_menu_restaurant
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id)
        ON DELETE CASCADE,

    INDEX idx_menu_active (is_active)
);


-- 6. dishes table
CREATE TABLE dishes (
    dish_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    name VARCHAR(150) NOT NULL,
    
    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    INDEX idx_dish_name (name)
);

-- 7. categories table
CREATE TABLE categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

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
CREATE TABLE menu_dishes (
    menu_id BIGINT NOT NULL,
    dish_id BIGINT NOT NULL,

    description VARCHAR(255),

    price DECIMAL(10,2) NOT NULL,

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    PRIMARY KEY (menu_id, dish_id),

    CONSTRAINT fk_menu_dishes_menu
        FOREIGN KEY (menu_id)
        REFERENCES menus(menu_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_menu_dishes_dish
        FOREIGN KEY (dish_id)
        REFERENCES dishes(dish_id)
        ON DELETE CASCADE,

    INDEX idx_menu_dishes_available (is_available)
);


-- 10. orders table
CREATE TABLE orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    customer_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,

    delivery_partner_id BIGINT NULL,

    order_status ENUM(
        'PLACED',
        'ACCEPTED',
        'PREPARING',
        'ASSIGNED',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'CANCELLED'
    ) NOT NULL DEFAULT 'PLACED',

    total_amount DECIMAL(10,2) NOT NULL,

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_order_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(user_id),

    CONSTRAINT fk_order_restaurant
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id),

    CONSTRAINT fk_order_delivery_partner
        FOREIGN KEY (delivery_partner_id)
        REFERENCES delivery_partners(delivery_partner_id),

    INDEX idx_orders_status (order_status),
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_restaurant (restaurant_id),
    INDEX idx_orders_delivery_partner (delivery_partner_id)
);


-- 11. payments table
create table payments (
	payment_id BIGINT auto_increment primary key,
    order_id BIGINT not null,
    payment_method enum('CASH','UPI', 'CARD') not null,
    payment_status enum('PENDING', 'PAID', 'FAILED') not null,    
    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    foreign key (order_id) references orders(order_id)
);

-- 12. order items table
CREATE TABLE order_items (
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT NOT NULL,
    dish_id BIGINT NOT NULL,

    quantity INT NOT NULL CHECK (quantity BETWEEN 1 AND 10),

    price DECIMAL(10,2) NOT NULL,

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_dish
        FOREIGN KEY (dish_id)
        REFERENCES dishes(dish_id)
        ON DELETE CASCADE,

    INDEX idx_order_items_order (order_id)
);


-- 13. reviews table
CREATE TABLE reviews (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,

    review_for ENUM(
        'RESTAURANT_REVIEW',
        'DELIVERY_PARTNER_REVIEW'
    ) NOT NULL,

    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),

    notes VARCHAR(300),

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_review_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_review_user
        FOREIGN KEY (reviewer_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    -- One review per type per order per user
    UNIQUE KEY uk_review_unique (order_id, reviewer_id, review_for),

    INDEX idx_review_order (order_id),
    INDEX idx_review_reviewer (reviewer_id)
);


-- 14. delivery logs table
CREATE TABLE delivery_logs (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT NOT NULL UNIQUE,
    delivery_partner_id BIGINT NOT NULL,

    delivery_status ENUM(
        'ASSIGNED',
        'PICKED_UP',
        'DELIVERED',
        'CANCELLED'
    ) NOT NULL,

    notes VARCHAR(150),

    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

    CONSTRAINT fk_delivery_logs_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_delivery_logs_partner
        FOREIGN KEY (delivery_partner_id)
        REFERENCES delivery_partners(delivery_partner_id)
        ON DELETE CASCADE,

    INDEX idx_delivery_logs_status (delivery_status),
    INDEX idx_delivery_logs_partner (delivery_partner_id)
);


-- triggers
DELIMITER $$

-- 1. trigger to update the delivery logs table 

CREATE TRIGGER trg_delivery_log_on_order_update
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    -- When order is assigned to delivery partner
    IF OLD.order_status <> 'ASSIGNED'
       AND NEW.order_status = 'ASSIGNED'
       AND NEW.delivery_partner_id IS NOT NULL THEN

        INSERT INTO delivery_logs (
            order_id,
            delivery_partner_id,
            delivery_status,
            notes,
            created_at,
            updated_at
        )
        VALUES (
            NEW.order_id,
            NEW.delivery_partner_id,
            'ASSIGNED',
            'Order assigned to delivery partner',
            CURRENT_DATE,
            CURRENT_TIMESTAMP(6)
        )
        ON DUPLICATE KEY UPDATE
            delivery_partner_id = VALUES(delivery_partner_id),
            delivery_status = 'ASSIGNED',
            notes = 'Order reassigned to delivery partner',
            updated_at = CURRENT_TIMESTAMP(6);
    END IF;

    -- When order is delivered
    IF OLD.order_status <> 'DELIVERED'
       AND NEW.order_status = 'DELIVERED' THEN

        UPDATE delivery_logs
        SET delivery_status = 'DELIVERED',
            notes = 'Order delivered successfully',
            updated_at = CURRENT_TIMESTAMP(6)
        WHERE order_id = NEW.order_id;
    END IF;

    -- When order is cancelled
    IF OLD.order_status <> 'CANCELLED'
       AND NEW.order_status = 'CANCELLED' THEN

        UPDATE delivery_logs
        SET delivery_status = 'CANCELLED',
            notes = 'Order cancelled',
            updated_at = CURRENT_TIMESTAMP(6)
        WHERE order_id = NEW.order_id;
    END IF;

END$$

DELIMITER ;
