package com.backend.repository.admin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.AvailabilityStatus;
import com.backend.entity.Restaurant;

public interface RestaurantApprovalRepository extends JpaRepository<Restaurant, Long> {

	List<Restaurant> findByStatus(AvailabilityStatus inactive);

}
