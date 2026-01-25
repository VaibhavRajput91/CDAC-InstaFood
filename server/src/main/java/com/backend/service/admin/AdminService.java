package com.backend.service.admin;

import java.util.List;

import com.backend.dto.TotalOrdersDetailsDTO;
import com.backend.dto.admin.*;
public interface AdminService {

	AdminProfileDTO getAdminDetails();

	List<RestaurantApplicationsDTO> getPendingRestaurantApplications();

	RestaurantApplicationDetailsDTO getRestaurantApplicationDetails(Long id);

	RestaurantApprovalResponseDTO acceptRestaurantAppication(Long id);

	List<DeliveryPartnerApplicationsDTO> getPendingDeliveryPartnerApplications();

	DeliveryPartnerDetailsDTO getDeliveryPartnerApplicationDetails(Long id);

	DeliveryApprovalResponseDTO acceptDeliveryApplication(Long id);

	RestaurantApprovalResponseDTO rejectRestaurant(Long id);

	DeliveryApprovalResponseDTO rejectDeliveryPartner(Long id);
	
	// Statistics of Restaurant
	Admin_RestaurantStatisticsDTO getRestaurantsStatistics();

	AdminCustomerStatsDTO getCustomerStatsData();
	
	TotalOrdersDetailsDTO getTotalOrdersDetails();

}
