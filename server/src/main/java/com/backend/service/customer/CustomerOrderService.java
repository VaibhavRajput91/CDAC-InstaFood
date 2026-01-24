package com.backend.service.customer;

import com.backend.dto.customer.OrdersByCustomerDTO;

public interface CustomerOrderService {
	
	OrdersByCustomerDTO getAllOrdersByCustomer(Long customerId); //METHOD TO GET ALL ORDERS BY A CUSTOMER
	

}
