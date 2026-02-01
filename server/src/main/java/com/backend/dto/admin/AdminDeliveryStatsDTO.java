package com.backend.dto.admin;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDeliveryStatsDTO {
    private long totalDeliveries;
    private long weeklyDeliveries;
    private List<Admin_DeliveryRankingDTO> deliveryPartnerRanking;
}

