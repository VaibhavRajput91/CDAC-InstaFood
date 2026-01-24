package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.*;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	
}
