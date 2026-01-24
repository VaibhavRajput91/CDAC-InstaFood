package com.backend.service.customer;

import com.backend.dto.customer.UserProfileDTO;
import com.backend.entity.User;

public interface CustomerService {
	
	UserProfileDTO getCustomerById(Long userId);
	

}
