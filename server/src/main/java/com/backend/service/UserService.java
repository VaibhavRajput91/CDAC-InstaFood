package com.backend.service;

import com.backend.dto.UserRequestDTO;
import com.backend.dto.UserResponseDTO;
import com.backend.entity.User;

public interface UserService {
	
	User getCustomerById(Long userId);
	UserResponseDTO registerCustomer(UserRequestDTO userReq);

}
