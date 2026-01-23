package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

	Optional<List<OrderItem>> findByOrderId(Long orderId); //lIST OF ORDER ITEMS OF A PARTICULAR ORDER
}
