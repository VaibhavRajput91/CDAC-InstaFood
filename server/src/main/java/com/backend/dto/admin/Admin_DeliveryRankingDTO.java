package com.backend.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin_DeliveryRankingDTO {
    private Long rank;
    private String deliveryPartnerName;
    private Long totalDeliveries;

    // Constructor for JPQL SELECT NEW
    public Admin_DeliveryRankingDTO(String deliveryPartnerName, Long totalDeliveries) {
        this.deliveryPartnerName = deliveryPartnerName;
        this.totalDeliveries = totalDeliveries;
    }
}