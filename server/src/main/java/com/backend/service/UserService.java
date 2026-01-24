package com.backend.service;

import com.backend.dto.AuthenticationRequest;
import com.backend.dto.AuthenticationResponse;
import com.backend.dto.customer.UserPasswordUpdateDTO;
import com.backend.dto.customer.UserRequestDTO;
import com.backend.dto.customer.UserResponseDTO;
import com.backend.dto.customer.UserUpdateDTO;
import com.backend.entity.User;

public interface UserService {
	
	
	UserResponseDTO registerUser(UserRequestDTO userReq);
	AuthenticationResponse loadUser(AuthenticationRequest authUser);
	UserResponseDTO updateUser(Long id, UserUpdateDTO userReq);
	String updateUserPassword(Long id, UserPasswordUpdateDTO passwordUpdateDTO); 
	
	

}
