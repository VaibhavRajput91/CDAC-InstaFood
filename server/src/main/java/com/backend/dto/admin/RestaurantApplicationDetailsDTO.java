package com.backend.dto.admin;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RestaurantApplicationDetailsDTO {

	private Long restaurantId;
    private String restaurantName;

    private String ownerName;
    private String email;
    private String phone;

    private String addressLine1;
    private String addressLine2;
}
