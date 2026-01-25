package com.backend.dto.admin;

import com.backend.entity.AvailabilityStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RestaurantApprovalResponseDTO {

	private Long restaurantId;
    private String restaurantName;
    private AvailabilityStatus status;
    private String message;
}
