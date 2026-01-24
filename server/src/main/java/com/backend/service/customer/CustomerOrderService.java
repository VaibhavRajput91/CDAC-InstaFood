package com.backend.service.customer;

import java.util.List;

import com.backend.dto.customer.OrdersByCustomerDTO;

public interface CustomerOrderService {
	
	List<OrdersByCustomerDTO> getAllOrdersByCustomer(Long customerId); //METHOD TO GET ALL ORDERS BY A CUSTOMER
	

}
