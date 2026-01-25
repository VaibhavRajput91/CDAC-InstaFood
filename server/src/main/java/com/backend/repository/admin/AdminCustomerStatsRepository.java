package com.backend.repository.admin;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.User;
import com.backend.entity.UserRole;

public interface AdminCustomerStatsRepository extends JpaRepository<User, Long> {

	long countByRole(UserRole role);

    long countByRoleAndCreatedOnAfter(UserRole role, LocalDate date);

    List<User> findByRole(UserRole role);
}
