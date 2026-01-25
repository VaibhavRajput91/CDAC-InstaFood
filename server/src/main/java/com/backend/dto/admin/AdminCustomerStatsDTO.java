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
public class AdminCustomerStatsDTO {

	private long totalCustomers;
    private long weeklyCustomers;
    private List<AdminCustomerDTO> customers;
}
