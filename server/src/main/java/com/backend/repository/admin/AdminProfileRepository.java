package com.backend.repository.admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.User;
import com.backend.entity.UserRole;

public interface AdminProfileRepository extends JpaRepository<User, Long> {

	Optional<User> findByRole(UserRole roleAdmin);

}
