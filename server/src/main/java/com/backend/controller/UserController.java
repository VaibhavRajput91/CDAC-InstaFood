package com.backend.controller;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.UserRequestDTO;
import com.backend.dto.UserResponseDTO;
import com.backend.entity.User;
import com.backend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private final ModelMapper modelMapper;
	
	@Autowired
	private UserService userService;

    UserController(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
	@GetMapping("/profile/{user_id}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Long userId)
	{
		System.out.println("In getCustomerDetails ");
		return ResponseEntity.ok(userService.getCustomerById(userId));
		
		
	}
	@PostMapping("/sign-up")
	public ResponseEntity<?> registerCustomer(@RequestBody UserRequestDTO user)
	{
		System.out.println("In registerCustomer ");
		try {
		return ResponseEntity.ok(userService.registerCustomer(user));
		}catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
		
	}


}
