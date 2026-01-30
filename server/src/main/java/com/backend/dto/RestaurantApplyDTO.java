package com.backend.dto;

import java.time.LocalTime;

import com.backend.entity.AvailabilityStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantApplyDTO {
    private Long userId;
    private String restaurantName;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private AvailabilityStatus status;
    private String restaurantImage;
}

