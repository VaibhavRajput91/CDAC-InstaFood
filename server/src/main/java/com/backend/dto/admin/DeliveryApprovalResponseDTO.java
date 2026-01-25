package com.backend.dto.admin;

import com.backend.entity.AvailabilityStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DeliveryApprovalResponseDTO {

	private Long deliveryId;
    private String deliveryPartnerName;
    private AvailabilityStatus status;
    private String message;
}
