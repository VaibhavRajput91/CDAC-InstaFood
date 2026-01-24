package com.backend.service.delivery;

import java.util.List;

import com.backend.dto.delivery.DeliveryTransactionsDto;
import com.backend.dto.delivery.DeliveryWalletSummaryDto;

public interface DeliveryWalletService {
	
	// method to get the earnings summary
	public Double getDailyEarning(Long deliveryPartnerId);
	public Double getWeeklyEarning(Long deliveryPartnerId);
	public Double getMonthlyEarning(Long deliveryPartnerId);
	
	// method to get wallet summary
	public DeliveryWalletSummaryDto getWalletSummary(Long deliveryPartnerId);
	
	// method to get earnings collection by month, week or daily
	public List<Double> getEarningsList(String range, Long deliveryPartnerId);
	
	// method to get past x number of transactions
	public List<DeliveryTransactionsDto> getTransactions(Long deliveryPartnerId, int limit);
	
}
