package com.backend.service.admin;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.backend.dto.admin.*;
import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.Restaurant;
import com.backend.entity.User;
import com.backend.entity.UserRole;
import com.backend.repository.admin.AdminCustomerStatsRepository;
import com.backend.repository.admin.AdminProfileRepository;
import com.backend.repository.admin.AdminRepositoryForRestaurant;
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
	private final AdminCustomerStatsRepository customerStatsRepository;
	
	private final AdminRepositoryForRestaurant adminRepositoryForRestaurant;

	
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
				restaurantApprovalRepository.findByStatus(AvailabilityStatus.PENDING);
		
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
		Restaurant restaurant = restaurantApprovalRepository.findByIdAndStatus(id,AvailabilityStatus.PENDING)
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
		        .findByIdAndStatus(id, AvailabilityStatus.PENDING)
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
				deliveryPartnerApprovalRepository.findByStatus(AvailabilityStatus.PENDING);
		
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

	@Override
	public DeliveryPartnerDetailsDTO getDeliveryPartnerApplicationDetails(Long id) {
		DeliveryPartner delivery = deliveryPartnerApprovalRepository.findByIdAndStatus(id,AvailabilityStatus.PENDING)
                .orElseThrow(() -> new RuntimeException("Delivery Partner not found"));

        User user = delivery.getUser();

        DeliveryPartnerDetailsDTO deliverydto = new DeliveryPartnerDetailsDTO();

        deliverydto.setDeliveryId(delivery.getId());
       // deliverydto.setDeliveryPartnerName(delivery.getUser().getFirstName()+" "+delivery.getUser().getLastName());

        deliverydto.setDeliveryPartnerName(user.getFirstName() + " " + user.getLastName());
        deliverydto.setEmail(user.getEmail());
        deliverydto.setPhone(user.getPhone());
        deliverydto.setLicenseNumber(delivery.getLicenseNumber());
        deliverydto.setVehicheType(delivery.getVehicleType());
        deliverydto.setAddress(user.getAddress().getLineOne() + " "+ user.getAddress().getLineTwo()+ " "+ user.getAddress().getPostalCode());
        

        return deliverydto;
	}

	@Override
	public DeliveryApprovalResponseDTO acceptDeliveryApplication(Long id) {
		DeliveryPartner delivery = deliveryPartnerApprovalRepository
		        .findByIdAndStatus(id, AvailabilityStatus.PENDING)
		        .orElseThrow(() -> new RuntimeException("Delivery Partner not found"));

		delivery.setStatus(AvailabilityStatus.AVAILABLE);
		    deliveryPartnerApprovalRepository.save(delivery);

		    return new DeliveryApprovalResponseDTO(
		    		delivery.getId(),
		    		delivery.getUser().getFirstName() + " " + delivery.getUser().getLastName(),
		    		delivery.getStatus(),
		        "Delivery Partner approved successfully"
		    );
	}

	@Override
	public RestaurantApprovalResponseDTO rejectRestaurant(Long id) {
		Restaurant restaurant =
	            restaurantApprovalRepository
	                .findByIdAndStatus(id, AvailabilityStatus.PENDING)
	                .orElseThrow(() ->
	                    new RuntimeException("Restaurant application not found or already processed")
	                );

	    // Status remains INACTIVE (explicitly setting is optional)
	     restaurant.setStatus(AvailabilityStatus.REJECTED);
		 restaurant.setLastUpdated(LocalDateTime.now());
	    // save is optional but recommended for clarity
	    restaurantApprovalRepository.save(restaurant);

	    return new RestaurantApprovalResponseDTO(
	            restaurant.getId(),
	            restaurant.getRestaurantName(),
	            restaurant.getStatus(),
	            "Restaurant application rejected successfully"
	    );
	}

	@Override
	public DeliveryApprovalResponseDTO rejectDeliveryPartner(Long id) {
		DeliveryPartner delivery = deliveryPartnerApprovalRepository
		        .findByIdAndStatus(id, AvailabilityStatus.PENDING)
		        .orElseThrow(() -> new RuntimeException("Delivery Partner not found"));

		       delivery.setStatus(AvailabilityStatus.REJECTED);
		       delivery.setLastUpdated(LocalDateTime.now());
		    deliveryPartnerApprovalRepository.save(delivery);

		    return new DeliveryApprovalResponseDTO(
		    		delivery.getId(),
		    		delivery.getUser().getFirstName() + " " + delivery.getUser().getLastName(),
		    		delivery.getStatus(),
		        "Delivery Partner application rejected"
		    );
	}
	
	// Statistics of Restaurant
	
	@Override
	public Admin_RestaurantStatisticsDTO getRestaurantsStatistics() {
		Admin_RestaurantStatisticsDTO dto=new Admin_RestaurantStatisticsDTO();
		
		dto.setTotalRestaurants(adminRepositoryForRestaurant.getTotalRestaurants());
		dto.setWeeklyNewRestaurants(adminRepositoryForRestaurant.getWeeklyNewRestaurants());
		
		List<Admin_RestaurantsRankingDTO> ranking = adminRepositoryForRestaurant.getRestaurantRanking()
		            .stream().map(r -> new Admin_RestaurantsRankingDTO(
		                    r.getRestaurantId(),
		                    r.getRanking(),
		                    r.getName(),
		                    r.getAverageRating(),
		                    r.getReviewCount()
		            )).toList();

		dto.setRestaurantRanking(ranking);
		return dto;
	}

	@Override
	public AdminCustomerStatsDTO getCustomerStatsData() {
		
		AdminCustomerStatsDTO response = new AdminCustomerStatsDTO();

        //  Total customers
        long totalCustomers =
        		customerStatsRepository.countByRole(UserRole.ROLE_CUSTOMER);

        //  Weekly customers (last 7 days)
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7);

        long weeklyCustomers =
        		customerStatsRepository.countByRoleAndCreatedOnAfter(
                        UserRole.ROLE_CUSTOMER,
                        oneWeekAgo
                );

        // 3 Customer list
        List<User> users =
        		customerStatsRepository.findByRole(UserRole.ROLE_CUSTOMER);

        List<AdminCustomerDTO> customerDTOs = new java.util.ArrayList<>();

        for (User user : users) {
        	AdminCustomerDTO dto = new AdminCustomerDTO(
                    user.getId(),
                    user.getFirstName() + " " + user.getLastName(),
                    user.getEmail(),
                    user.getPhone()
            );
            customerDTOs.add(dto);
        }

        response.setTotalCustomers(totalCustomers);
        response.setWeeklyCustomers(weeklyCustomers);
        response.setCustomers(customerDTOs);

        return response;

	}

}
