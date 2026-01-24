package com.backend.service;

import com.backend.dto.OrdersByCustomerDTO;

public interface OrderService {
	
	OrdersByCustomerDTO getAllOrdersByCustomer(Long customerId); //METHOD TO GET ALL ORDERS BY A CUSTOMER
	

}
