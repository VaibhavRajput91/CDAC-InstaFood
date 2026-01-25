package com.backend.service.admin;

import java.util.List;

import com.backend.dto.admin.AdminProfileDTO;
import com.backend.dto.admin.RestaurantApplicationDetailsDTO;
import com.backend.dto.admin.RestaurantApplicationsDTO;
import com.backend.dto.admin.RestaurantApprovalResponseDTO;

public interface AdminService {

	AdminProfileDTO getAdminDetails();

	List<RestaurantApplicationsDTO> getPendingRestaurantApplications();

	RestaurantApplicationDetailsDTO getRestaurantApplicationDetails(Long id);

	RestaurantApprovalResponseDTO acceptRestaurantAppication(Long id);

}
