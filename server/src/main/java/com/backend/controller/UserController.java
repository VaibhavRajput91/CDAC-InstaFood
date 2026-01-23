package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.AuthenticationRequest;
import com.backend.dto.AuthenticationResponse;
import com.backend.dto.UserRequestDTO;
import com.backend.security.JwtUtil;
import com.backend.service.UserService;


import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

	private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
	
//	private final CustomUserDetailsServiceImpl customUserDetailsService;

    
	
	@PostMapping("/sign-in")
	public ResponseEntity<?> loginUser(@RequestBody AuthenticationRequest authUser)
	{
//		Authentication auth = new UsernamePasswordAuthenticationToken(authUser.getEmail(), authUser.getPassword());
//		auth = authenticationManager.authenticate(auth);
//		String token = jwtUtil.createToken(auth);
//		return ResponseEntity.ok(token);


		Authentication authToken=	new
				UsernamePasswordAuthenticationToken(authUser.getEmail(),
						authUser.getPassword());
				System.out.println("before - "+authToken.isAuthenticated());//false
				Authentication validAuth = 
						authenticationManager.authenticate(authToken);
				//=> success
				System.out.println("after - "+validAuth.isAuthenticated());//true
				System.out.println(validAuth);//user details : UserEntity
				//2. Create signed JWT n send it in the response.
				
				return ResponseEntity.status(HttpStatus.CREATED)//SC 201
						.body(new AuthenticationResponse(authUser.getEmail(),
								jwtUtil.generateJwtToken(validAuth)));
		
	}
	@PostMapping("/sign-up")
	public ResponseEntity<?> registerUser(@RequestBody UserRequestDTO user)
	{
		System.out.println("In registerCustomer ");
		try {
		return ResponseEntity.ok(userService.registerUser(user));
		}catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
		
	}


}
