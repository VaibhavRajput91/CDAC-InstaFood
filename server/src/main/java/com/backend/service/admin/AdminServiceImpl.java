package com.backend.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.backend.dto.admin.AdminProfileDTO;
import com.backend.dto.admin.RestaurantApplicationsDTO;
import com.backend.entity.AvailabilityStatus;
import com.backend.entity.Restaurant;
import com.backend.entity.User;
import com.backend.entity.UserRole;
import com.backend.repository.admin.AdminProfileRepository;
import com.backend.repository.admin.RestaurantApprovalRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

	private final AdminProfileRepository adminProfileRepository;
	
	private final RestaurantApprovalRepository restaurantApprovalRepository;
	private final ModelMapper modelMapper;

	@Override
	public AdminProfileDTO getAdminDetails() {
		User user = adminProfileRepository.findByRole(UserRole.ROLE_ADMIN).orElseThrow(()->new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User Not Found"
            ));
		System.out.println(user);
		AdminProfileDTO adminProfile = modelMapper.map(user, AdminProfileDTO.class);
		return adminProfile;
	}

	@Override
	public List<RestaurantApplicationsDTO> getPendingRestaurantApplications() {
		
		List<Restaurant> restaurants =
				restaurantApprovalRepository.findByStatus(AvailabilityStatus.INACTIVE);
		
        // Convert Entity → DTO (USING FOR LOOP)
        List<RestaurantApplicationsDTO> dtoList = new ArrayList<>();

        for (Restaurant restaurant : restaurants) {
            RestaurantApplicationsDTO restaurantdto = new RestaurantApplicationsDTO();
            restaurantdto.setId(restaurant.getId());
            restaurantdto.setRestaurantName(restaurant.getRestaurantName());

            dtoList.add(restaurantdto);
        }

        return dtoList;
	}
}
