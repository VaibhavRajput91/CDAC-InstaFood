package com.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.customer.CustomerService;
import com.backend.dto.customer.PlaceOrderDTO;
import com.backend.service.customer.CustomerOrderService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/customer")
public class CustomerController {
	
	
	private final CustomerService customerService;
	private final CustomerOrderService orderService;
	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Long userId)
	{
		System.out.println("In getCustomerDetails ");
		return ResponseEntity.ok(customerService.getCustomerById(userId));
		
		
	}
	@GetMapping("/order/{userId}")
	public ResponseEntity<?> getAllOrdersByCustomer(@PathVariable Long userId)
	{
		System.out.println("getAllOrdersByCustomer");
		return ResponseEntity.ok(orderService.getAllOrdersByCustomer(userId));
		
		
	}
	@PostMapping("/place-order")
	public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderDTO orderDto)
	{
		System.out.println("In placeOrder ");
		 return ResponseEntity.ok(customerService.placeOrder(orderDto));
		
		
	}

}
