package com.backend.service.admin;

import java.util.List;

import com.backend.dto.admin.AdminProfileDTO;
import com.backend.dto.admin.RestaurantApplicationDetailsDTO;
import com.backend.dto.admin.RestaurantApplicationsDTO;

public interface AdminService {

	AdminProfileDTO getAdminDetails();

	List<RestaurantApplicationsDTO> getPendingRestaurantApplications();

	RestaurantApplicationDetailsDTO getRestaurantApplicationDetails(Long id);

}
