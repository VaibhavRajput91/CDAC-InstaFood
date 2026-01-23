package com.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.CustomerService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/customer")
public class CustomerController {
	
	
	private final CustomerService customerService;
	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Long userId)
	{
		System.out.println("In getCustomerDetails ");
		return ResponseEntity.ok(customerService.getCustomerById(userId));
		
		
	}

}
