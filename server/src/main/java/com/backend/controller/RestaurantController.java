package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.*;
import com.backend.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
	
	private final RestaurantService restaurantService;
	
	public RestaurantController(RestaurantService restaurantService) {
		this.restaurantService=restaurantService;
	}
	
	//Apply Page

	@PostMapping("/apply")
	public ResponseEntity<?> apply(@RequestBody RestaurantApplyDTO applyDTO){
		System.out.println("In Post of Restaurant/Apply");
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(restaurantService.restaurantApply(applyDTO));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	
	// menu page
	
	@GetMapping("/menu/statics")
	public ResponseEntity<?> getStats(@RequestParam Long id){
		System.out.println("In Get of Restaurant/Menu/Stats");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.restaurantStatics(id));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}

	//menu dishes
	
	@GetMapping("/menu/dishes")
	public ResponseEntity<?> getDishes(@RequestParam Long id){
		System.out.println("In Get of Restaurant/Menu/Dishes");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.getMenuDishes(id));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	
	
	
	@PutMapping("/menu/toggle-dish")
	public ResponseEntity<?> toggleDishAvailability(@RequestParam long id){
		
		return ResponseEntity.status(HttpStatus.OK)
				.body("toggled dish availability for dish id : " + id);
	}
	
	@DeleteMapping("/menu/delete")
	public ResponseEntity<?> deleteDish(@RequestParam long id){
		return ResponseEntity.status(HttpStatus.OK)
				.body("Deleted dish with id : " + id);
	}
	
	// add dish page
	
	@GetMapping("/dish/dishId")
	public ResponseEntity<?> getDish(@RequestParam Long dishId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getDishDetailsById(dishId));
	}
	
	@PatchMapping("/dish")
	public ResponseEntity<?> updateDish(@RequestParam long id){
		return ResponseEntity.status(HttpStatus.OK)
				.body("Dish with id : " + id + " updated successfully");
	}
	
	
	// restaurant profile page and edit profile page
	
	@GetMapping("/profile/restaurantId")
	public ResponseEntity<?> getRestaurantDetails(@RequestParam Long restaurantId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getRestaurantDetailsById(restaurantId));
	}
	
	@PatchMapping("/profile/restaurantId")
	public ResponseEntity<?> updateRestaurantDetails(@RequestParam Long restaurantId,@RequestBody RestaurantUpdateDTO updatedRestaurantDetails){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.updateRestaurantDetails(restaurantId, updatedRestaurantDetails));
	}
	
	// orders page
	
	@GetMapping("/orders")
	public ResponseEntity<?> getOrdersList(@RequestParam Long size){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getAllOrdersByRestaurant(size));
	}
	
}

















