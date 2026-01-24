package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Menu;
import com.backend.entity.Restaurant;
import java.util.List;


public interface MenuRepository extends JpaRepository<Menu, Long> {
	Optional<Menu> findByRestaurant(Restaurant restaurant); // FIND MENU BY ID
	Optional<Menu> findById(Long id);

}
