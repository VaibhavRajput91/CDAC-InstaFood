package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.demo;
import com.backend.service.admin.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

	private final AdminService adminService;
	
	@GetMapping("/profile")
	public ResponseEntity<?> getAdminDetails()
	{
		System.out.println("In getAdminDetails");

			return ResponseEntity.ok(adminService.getAdminDetails());
		
		
	}
	
	@GetMapping("/dashboard/order-status")
	public ResponseEntity<?> orderStatus()
	{
	   System.out.println("In Order Status");
	   try {
		   return ResponseEntity.ok("Displaying Order Status");
	   }
	   catch(RuntimeException e)
	   {
		   return ResponseEntity.status(HttpStatus.NOT_FOUND)
				   .body("Error");
	   }
		
	}
	
	@GetMapping("/dashboard/orders-per-day")
	public ResponseEntity<?> ordersPerDay()
	{
		System.out.println("In GET dashboard/orders-per-day");
		try
		{
			return ResponseEntity.ok("Displaying Orders Per Day");
		
		}
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
		
	
	}
	
	@GetMapping("/dashboard/top-items")
	public ResponseEntity<?> topSellingItems()
	{
		System.out.println("In GET dashboard/top-items");
		try {
			return ResponseEntity.ok("Displaying Top selling items");
		}
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	@GetMapping("/approvals/restaurants")
	public ResponseEntity<?> pendingRestaurants()
	{
		System.out.println("In GET /approvals/restauratns");
		try {
			return ResponseEntity.ok("Displaying list of pending applications");
		}
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
		
	}
	
	@GetMapping("/approvals/restaurants/{id}")
	public ResponseEntity<?> pendingRestaurantApplication(@PathVariable Long id)
	{
		System.out.println("In GET /approvals/restauratns/{id}");
		try {
			return ResponseEntity.ok("Displaying application details of applicant with id " + id);
		}
		catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
		
	}
	
	
  @PutMapping("/approvals/restaurants/{id}/approve")
  public ResponseEntity<?> approveRestaurant(@PathVariable Long id,@RequestBody demo demoDto)
  {  
	  System.out.println("In Put - /approvals/restaurants"); 
  try {
		 return ResponseEntity.ok("Restaurant Approved Successfully");
	  }
	  catch(RuntimeException e)
	  {
		  
		return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
	  }
  }
  
  @PutMapping("/approvals/restaurants/{id}/reject")
  public ResponseEntity<?> rejectRestaurant(@PathVariable Long id,@RequestBody demo demoDto)
  {
	   try {
		   return ResponseEntity.ok("Restaurant rejected");
	   }
	   catch(RuntimeException e)
	   {
		   return ResponseEntity.status(HttpStatus.NOT_FOUND)
				   .body("Error");
	   }
  }
  @GetMapping("/approvals/delivery-partners/applications")
  public ResponseEntity<?> pendingDeliveryPartnerApplications()
  {
	  System.out.println("In GET delivery partner applications");
	  try {
		  return ResponseEntity.ok("Displaying list of application");
	  }
	  catch(RuntimeException e)
	  {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
        		  .body("Error");
	  }
  }
  
  @GetMapping("/approvals/delivery-partners/applications/{id}")
  public ResponseEntity<?> pendingDeliveryPartnerApplication(@PathVariable Long id)
  {
	  System.out.println("In GET delivery partner application");
	  try {
		  return ResponseEntity.ok("Displaying data of particular delivery-partner application with id "+id);
	  }
	  catch(RuntimeException e)
	  {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
        		  .body("Error");
	  }
  }
  
  @PutMapping("/approvals/delivery-partners/{id}/approve")
  public ResponseEntity<?> approveDeliveryPartner(@PathVariable Long id,@RequestBody demo demoDto)
  {
	  try {
		 return ResponseEntity.ok("delivery-partner Approved Successfully");
	  }
	  catch(RuntimeException e)
	  {
		  
		return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
	  }
  }
  
  @PutMapping("/approvals/delivery-partners/{id}/reject")
  public ResponseEntity<?> rejectDeliveryPartner(@PathVariable Long id,@RequestBody demo demoDto)
  {
	   try {
		   return ResponseEntity.ok("DeliveryPartner rejected");
	   }
	   catch(RuntimeException e)
	   {
		   return ResponseEntity.status(HttpStatus.NOT_FOUND)
				   .body("Error");
	   }
  }
  
  @GetMapping("/statistics/customers")
  public ResponseEntity<?> customerData()
  {
	  System.out.println("Customer Data");
	  try {
		    return ResponseEntity.ok("Customer Data");
	  }
	  catch(RuntimeException e)
	  {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND)
				  .body("Error");
	  }
  }
  @GetMapping("/statistics/restaurants")
  public ResponseEntity<?> restaurantData()
  {
	  System.out.println("Restaurant Data");
	  try {
		    return ResponseEntity.ok("Restaurant Data");
	  }
	  catch(RuntimeException e)
	  {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND)
				  .body("Error");
	  }
  }
  @GetMapping("/statistics/delivery-partners")
  public ResponseEntity<?> deliveryPartnerData()
  {
	  System.out.println("deliveryPartner Data");
	  try {
		    return ResponseEntity.ok("deliveryPartner Data");
	  }
	  catch(RuntimeException e)
	  {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND)
				  .body("Error");
	  }
  }
}
