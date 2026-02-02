package com.backend.repository.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.AvailabilityStatus;
import com.backend.entity.Restaurant;
import com.backend.entity.User;

public interface RestaurantApprovalRepository extends JpaRepository<Restaurant, Long> {

	//List<Restaurant> findByStatus(AvailabilityStatus inactive);
	List<Restaurant> findByStatusOrderByCreatedOnAsc(AvailabilityStatus inactive);

	Optional<Restaurant> findByIdAndStatus(Long id, AvailabilityStatus inactive);

}
