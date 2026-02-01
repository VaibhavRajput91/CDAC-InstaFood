package com.backend.service.delivery;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.backend.dto.delivery.DeliveryTransactionsDto;
import com.backend.dto.delivery.DeliveryWalletSummaryDto;
import com.backend.repository.delivery.DeliveryWalletRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DeliveryWalletServiceImpl implements DeliveryWalletService {

	private final DeliveryWalletRepository walletRepository;

	@Override
	public Double getDailyEarning(Long deliveryPartnerId) {
		LocalDate today = LocalDate.now();
		double todayEarning = walletRepository.getEarnings(deliveryPartnerId, today, today);
		return todayEarning;
	}

	@Override
	public Double getWeeklyEarning(Long deliveryPartnerId) {
		LocalDate weekStart = LocalDate.now().with(DayOfWeek.MONDAY);
		LocalDate weekEnd = weekStart.plusDays(6);
		double weekEarning = walletRepository.getEarnings(deliveryPartnerId, weekStart, weekEnd);
		return weekEarning;
	}

	@Override
	public Double getMonthlyEarning(Long deliveryPartnerId) {
		LocalDate monthStart = LocalDate.now().withDayOfMonth(1);
		LocalDate monthEnd = monthStart.plusMonths(1).minusDays(1);
		double monthEarning = walletRepository.getEarnings(deliveryPartnerId, monthStart, monthEnd);
		return monthEarning;
	}

	@Override
	public DeliveryWalletSummaryDto getWalletSummary(Long deliveryPartnerId) {
		DeliveryWalletSummaryDto dto = new DeliveryWalletSummaryDto();
		dto.setTodayCollection(getDailyEarning(deliveryPartnerId));
		dto.setWeekCollection(getWeeklyEarning(deliveryPartnerId));
		dto.setMonthCollection(getMonthlyEarning(deliveryPartnerId));
		return dto;
	}

	@Override
	public List<Double> getEarningsList(String range, Long deliveryPartnerId) {
		List<Double> earnings = new ArrayList<>();

		if (range.equals("daily")) {
			LocalDate today = LocalDate.now();
			for (int i = 0; i < 7; i++) {
				LocalDate d = today.minusDays(i);
				earnings.add(walletRepository.getEarnings(deliveryPartnerId, d, d));
			}
		} else if (range.equals("weekly")) {
			LocalDate weekStart = LocalDate.now().with(DayOfWeek.MONDAY);
			for (int i = 0; i < 7; i++) {
				LocalDate ws = weekStart.minusWeeks(i);
				LocalDate we = ws.plusDays(6);
				earnings.add(walletRepository.getEarnings(deliveryPartnerId, ws, we));
			}
		} else if (range.equals("monthly")) {
			LocalDate monthStart = LocalDate.now().withDayOfMonth(1);
			for (int i = 0; i < 7; i++) {
				LocalDate ms = monthStart.minusMonths(i);
				LocalDate me = ms.plusMonths(1).minusDays(1);
				earnings.add(walletRepository.getEarnings(deliveryPartnerId, ms, me));
			}
		}

		return earnings;
	}

	@Override
	public List<DeliveryTransactionsDto> getTransactions(Long deliveryPartnerId, int limit) {
		int pageSize = Math.max(1, limit);
		// Fetch ALL logs to filter in stream if needed or just fetch recent.
		// Requirement: "return the given number of orders... either delivered or
		// cancelled"
		// The repository method finds by partner ID order by created desc. Assuming
		// logs track status correctly.
		List<com.backend.entity.DeliveryLog> logs = walletRepository
				.findByDeliveryPartnerIdOrderByCreatedOnDesc(deliveryPartnerId, PageRequest.of(0, pageSize));
		List<DeliveryTransactionsDto> txns = new ArrayList<>();
		for (com.backend.entity.DeliveryLog dl : logs) {
			DeliveryTransactionsDto dto = new DeliveryTransactionsDto();
			dto.setOrderId(dl.getOrder().getId());
			dto.setOrderStatus(dl.getOrder().getOrderStatus());
			// Use fixed payout 30.0
			dto.setEarnings(30.0);
			txns.add(dto);
		}
		return txns;
	}

}