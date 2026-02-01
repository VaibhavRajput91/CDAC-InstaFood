package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.*;
import com.backend.service.RestaurantService;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
	
	private final RestaurantService restaurantService;
	
	public RestaurantController(RestaurantService restaurantService) {
		this.restaurantService=restaurantService;
	}
	
	@GetMapping("/restaurantId")
	public ResponseEntity<?> getRestaurantIdFromUserId(@RequestParam Long userId){
		System.out.println("In Get of restaurant/restaurantId");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new RestaurantApiResponseDTO("Success",restaurantService.getRestaurantId(userId)));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
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
	
	@GetMapping("/apply/approve")
	public ResponseEntity<?> approveByAdmin(@RequestParam Long restaurantId){
		System.out.println("In Get of apply/approve");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.adminApproval(restaurantId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	@PutMapping("/availability")
	public ResponseEntity<?> toggleRestaurantAvailability(@RequestParam long restaurantId){
		System.out.println("In Put of Menu/ToggleDish");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new RestaurantApiResponseDTO("Success", restaurantService.RestaurantAvailability(restaurantId)));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	// menu page
	
	@GetMapping("/statistics")
	public ResponseEntity<?> getStats(@RequestParam Long restaurantId){
		System.out.println("In Get of Restaurant/Menu/Stats");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.restaurantStatistics(restaurantId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	@GetMapping("/menu")
	public ResponseEntity<?> getMenuId(@RequestParam Long restaurantId){
		System.out.println("In Get of Restaurant/Menu");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.getMenuIdByRestaurantId(restaurantId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}

	//menu dishes
	
	@GetMapping("/menu/dishes")
	public ResponseEntity<?> getDishes(@RequestParam Long restaurantId){
		System.out.println("In Get of Restaurant/Menu/Dishes");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.getMenuDishes(restaurantId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	@GetMapping("/menu/Dishes")
	public ResponseEntity<?> getAvailableDishes(@RequestParam Long id){
		System.out.println("In Get of Restaurant/Menu/Dishes");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.getAvailableMenuDishes(id));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	//toggle dish availability
	
	@PutMapping("/menu/dishes")
	public ResponseEntity<?> toggleDishAvailability(@RequestParam long menuId ,@RequestParam long dishId){
		System.out.println("In Put of Menu/ToggleDish");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new RestaurantApiResponseDTO("Success", restaurantService.DishAvailability(menuId,dishId)));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	
	
	// Delete dish using menuId & dishId
	
	@DeleteMapping("/menu/dishes")
	public ResponseEntity<?> deleteDish(@RequestParam Long menuId,@RequestParam Long dishId){
		System.out.println("In Delete of Menu/Delete");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new RestaurantApiResponseDTO("Success", restaurantService.deleteMenuDish(menuId,dishId)));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	@GetMapping("/menu/dishes/add/categories")
	public ResponseEntity<?> getDish(){
		System.out.println("In Get of menu/dishes/add/categories");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.getDishCategories());
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	
	@PostMapping("/menu/dishes/add")
	public ResponseEntity<?> addDish(@RequestParam Long menuId, @RequestBody RestaurantAddDishDTO dishDTO){
		System.out.println("In Get of menu/dishes/add");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.addNewDish(menuId,dishDTO));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	@GetMapping("/menu/dishes/edit")
	public ResponseEntity<?> getDish(@RequestParam Long menuId,@RequestParam Long dishId){
		System.out.println("In Get of menu/dishes/edit");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.getDishDetailsById(menuId,dishId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	
	
	@PatchMapping("/menu/dishes/edit")
	public ResponseEntity<?> updateDish(@RequestParam Long menuId,@RequestParam Long dishid,@RequestBody DishUpdateDTO updatedDish){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.updateDishDetails(menuId,dishid, updatedDish));
	}
	
	
	// restaurant profile page and edit profile page
	
	@GetMapping("/profile/restaurantId")
	public ResponseEntity<?> getRestaurantDetails(@RequestParam Long restaurantId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getRestaurantDetailsById(restaurantId));
	}
	
	@PatchMapping("/profile/restaurantId/{restaurantId}")
	public ResponseEntity<?> updateRestaurantDetails(@PathVariable Long restaurantId, @RequestBody RestaurantUpdateDTO updatedRestaurantDetails){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.updateRestaurantDetails(restaurantId, updatedRestaurantDetails));
	}
	
	// orders page
	
	
	
	@GetMapping("/orders/placed")
	public ResponseEntity<?> getAllNewPlacedOrdersList(@RequestParam Long restaurantId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getAllPlacedOrders(restaurantId));
	}
	@GetMapping("/orders/accepted")
	public ResponseEntity<?> getAllAcceptedOrdersList(@RequestParam Long restaurantId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getAllAcceptedOrders(restaurantId));
	}
	@GetMapping("/orders/preparing")
	public ResponseEntity<?> getAllPreparingOrdersList(@RequestParam Long restaurantId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getAllPreparingOrders(restaurantId));
	}
	@GetMapping("/orders/assigned")
	public ResponseEntity<?> getAllAssignedOrdersList(@RequestParam Long restaurantId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getAllAssignedOrders(restaurantId));
	}
	@GetMapping("/orders/delivered")
	public ResponseEntity<?> getAllDeliveredOrdersList(@RequestParam Long restaurantId){
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getAllDeliveredOrders(restaurantId));
	}
	
	
	@GetMapping("/list-restaurants")
	public ResponseEntity<?> getRestaurantsList(@RequestParam(required = false) String postalCode){
		if (postalCode != null && !postalCode.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.getRestaurantsByPincode(postalCode));
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(restaurantService.getAllRestaurants());
	}
	
	@PutMapping("/orders/placed")
	public ResponseEntity<?> acceptingOrder(@RequestParam long orderId){
		System.out.println("In Put of orders/placed");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.acceptingOrderByOrderId(orderId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
	@PutMapping("/orders/preparing")
	public ResponseEntity<?> preparingOrder(@RequestParam long orderId){
		System.out.println("In Put of orders/placed");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(restaurantService.preparingOrderByOrderId(orderId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestaurantApiResponseDTO("Failed", e.getMessage()));
		}
	}
	
}

















