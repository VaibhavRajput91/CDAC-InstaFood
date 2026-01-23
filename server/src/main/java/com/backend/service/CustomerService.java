package com.backend.service;

import com.backend.dto.UserProfileDTO;
import com.backend.entity.User;

public interface CustomerService {
	
	UserProfileDTO getCustomerById(Long userId);

}
