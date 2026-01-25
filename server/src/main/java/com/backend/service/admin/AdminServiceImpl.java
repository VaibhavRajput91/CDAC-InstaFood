package com.backend.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.backend.dto.admin.AdminProfileDTO;
import com.backend.dto.admin.DeliveryPartnerApplicationsDTO;
import com.backend.dto.admin.RestaurantApplicationDetailsDTO;
import com.backend.dto.admin.RestaurantApplicationsDTO;
import com.backend.dto.admin.RestaurantApprovalResponseDTO;
import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.Restaurant;
import com.backend.entity.User;
import com.backend.entity.UserRole;
import com.backend.repository.admin.AdminProfileRepository;
import com.backend.repository.admin.DeliveryPartnerApprovalRepository;
import com.backend.repository.admin.RestaurantApprovalRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

	private final AdminProfileRepository adminProfileRepository;
	
	private final RestaurantApprovalRepository restaurantApprovalRepository;
	private final DeliveryPartnerApprovalRepository deliveryPartnerApprovalRepository;
	
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

	@Override
	public RestaurantApplicationDetailsDTO getRestaurantApplicationDetails(Long id) {
		Restaurant restaurant = restaurantApprovalRepository.findByIdAndStatus(id,AvailabilityStatus.INACTIVE)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        User user = restaurant.getUser();

        RestaurantApplicationDetailsDTO restaurantdto = new RestaurantApplicationDetailsDTO();

        restaurantdto.setRestaurantId(restaurant.getId());
        restaurantdto.setRestaurantName(restaurant.getRestaurantName());

        restaurantdto.setOwnerName(user.getFirstName() + " " + user.getLastName());
        restaurantdto.setEmail(user.getEmail());
        restaurantdto.setPhone(user.getPhone());

        restaurantdto.setAddressLine1(user.getAddress().getLineOne());
        restaurantdto.setAddressLine2(user.getAddress().getLineTwo());

        return restaurantdto;
		
	}

	@Override
	public RestaurantApprovalResponseDTO acceptRestaurantAppication(Long id) {
		Restaurant restaurant = restaurantApprovalRepository
		        .findByIdAndStatus(id, AvailabilityStatus.INACTIVE)
		        .orElseThrow(() -> new RuntimeException("Restaurant not found"));

		    restaurant.setStatus(AvailabilityStatus.AVAILABLE);
		    restaurantApprovalRepository.save(restaurant);

		    return new RestaurantApprovalResponseDTO(
		        restaurant.getId(),
		        restaurant.getRestaurantName(),
		        restaurant.getStatus(),
		        "Restaurant approved successfully"
		    );
	}

	@Override
	public List<DeliveryPartnerApplicationsDTO> getPendingDeliveryPartnerApplications() {
		List<DeliveryPartner> applications =
				deliveryPartnerApprovalRepository.findByStatus(AvailabilityStatus.INACTIVE);
		
        // Convert Entity → DTO (USING FOR LOOP)
        List<DeliveryPartnerApplicationsDTO> dtoList = new ArrayList<>();

        for (DeliveryPartner delvieryPartner : applications) {
        	DeliveryPartnerApplicationsDTO deliveryPartnerdto = new DeliveryPartnerApplicationsDTO();
            deliveryPartnerdto.setId(delvieryPartner.getId());
            deliveryPartnerdto.setDeliveryPartnerName(delvieryPartner.getUser().getFirstName() +" "+delvieryPartner.getUser().getLastName());

            dtoList.add(deliveryPartnerdto);
        }

        return dtoList;
	}
}
