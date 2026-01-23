package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.User;
import com.backend.entity.UserRole;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	
	Optional<User>  findByIdAndRole(Long id, UserRole role);
	Optional<User>  findByEmail(String email);
	boolean existsByEmail(String email);

}
