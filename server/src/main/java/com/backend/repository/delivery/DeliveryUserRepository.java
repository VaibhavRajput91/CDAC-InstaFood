package com.backend.repository.delivery;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.User;
import java.util.List;
import com.backend.entity.UserRole;


public interface DeliveryUserRepository extends JpaRepository<User, Long> {
	// return user by user id and role is ROLE_DELIVERY
	public Optional<User> findByIdAndRole(Long id, UserRole role);
	// return user by email
	public User findByEmail(String email);
	// return user by phone number
	public User findByPhone(String phone);
}
