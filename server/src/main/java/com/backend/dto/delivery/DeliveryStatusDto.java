package com.backend.dto.delivery;

import com.backend.entity.AvailabilityStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryStatusDto {
	private AvailabilityStatus status;
}
