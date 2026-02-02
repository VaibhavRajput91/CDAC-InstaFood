package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.demo;
import com.backend.dto.delivery.DeliveryPartnerApplyDto;
import com.backend.dto.delivery.DeliveryProfileDto;
import com.backend.dto.delivery.DeliveryWalletSummaryDto;
import com.backend.entity.OrderStatus;
import com.backend.service.delivery.ApplyForDeliveryService;
import com.backend.service.delivery.DeliveryDashboardService;
import com.backend.service.delivery.DeliveryOrderService;
import com.backend.service.delivery.DeliveryProfileService;
import com.backend.service.delivery.DeliveryWalletService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/delivery")
@RequiredArgsConstructor
public class DeliveryController {

	// dependencies
	private final DeliveryOrderService orderService;
	private final DeliveryWalletService deliveryWalletService;
	private final DeliveryProfileService deliveryProfileService;
	private final ApplyForDeliveryService applyForDeliveryService;
	private final DeliveryDashboardService deliveryDashboardService;

	// applying as a delivery partner
	@PutMapping("/apply")
	public ResponseEntity<?> addPartner(@RequestBody DeliveryPartnerApplyDto applyDto, @RequestParam Long userId) {
		System.out.println("In put add-partner");
		try {
			System.out.print(applyDto.toString());
			applyForDeliveryService.applyForDeliveryPartner(userId, applyDto);
			return ResponseEntity.ok("success");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// get delivery partner id by user-id
	@GetMapping("/delivery-id")
	public ResponseEntity<?> getDeliveryPartnerId(@RequestParam Long userId) {
		System.out.println("In Get delivery-id");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(deliveryProfileService.getDeliveryPartnerId(userId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error:" + e.getMessage());
		}
	}

	// the summary section of wallet page
	@GetMapping("/wallet/summary")
	public ResponseEntity<?> walletSummary(@RequestParam Long deliveryPartnerId) {
		System.out.println("In Get wallet/summary");

		try {
			DeliveryWalletSummaryDto walletSummary = deliveryWalletService.getWalletSummary(deliveryPartnerId);
			return ResponseEntity.status(HttpStatus.OK).body(walletSummary);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}

	// transactions on wallet page
	@GetMapping("/wallet/transactions")
	public ResponseEntity<?> walletTransactions(@RequestParam Long deliveryPartnerId, @RequestParam int size) {
		System.out.println("In Get wallet/transactions?size");
		try {
			return ResponseEntity.ok(deliveryWalletService.getTransactions(deliveryPartnerId, size));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}

	// daily, weekly or monthly earnings trend for transactions page chart
	@GetMapping("/wallet/earnings-trend")
	public ResponseEntity<?> walletEarningsTrend(@RequestParam String range, @RequestParam Long deliveryPartnerId) {
		System.out.println("In Get Wallet/Earinings-Trend");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(deliveryWalletService.getEarningsList(range, deliveryPartnerId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}

	// details of delivery partner based on delivery Partner id
	@GetMapping("/details")
	public ResponseEntity<?> profile(@RequestParam Long deliveryPartnerId) {
		System.out.println("In Get details");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(deliveryProfileService.getDeliveryPartnerProfile(deliveryPartnerId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// modify the details of delivery partner
	@PutMapping("/edit-details")
	public ResponseEntity<?> editProfile(@RequestBody DeliveryProfileDto profileDto,
			@RequestParam Long deliveryPartnerId) {
		System.out.println("In Put Edit-Details");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(deliveryProfileService.updateDeliveryPartnerProfile(deliveryPartnerId, profileDto));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// get all the orders by delivery partner id and order status(delivered,
	// cancelled, etc)
	@GetMapping("/orders")
	public ResponseEntity<?> orders(@RequestParam Long deliveryPartnerId, @RequestParam OrderStatus status) {
		System.out.println("In Get Orders");
		try {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(orderService.getTodayOrdersList(deliveryPartnerId, status));
		} catch (RuntimeException e) {
			System.out.print(e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("error : " + e.getMessage());
		}
	}

	// order details for a particular order id.
	@GetMapping("/orders/order-details")
	public ResponseEntity<?> orderDetails(@RequestParam Long orderId) {
		System.out.println("In Get Orders/order-details");
		try {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(orderService.getOrderDetails(orderId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// get last n orders made by the delivery partner
	@GetMapping("orders/history")
	public ResponseEntity<?> orderHistory(@RequestParam Long id) {
		System.out.print("In delivery order history");
		try {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(orderService.getOrdersHistory(id, 20));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// delivery dashboard summary
	@GetMapping("/dashboard/summary")
	public ResponseEntity<?> dashboardSummary(@RequestParam Long deliveryPartnerId) {
		System.out.println("In Get dashboard/summary");
		try {
			return ResponseEntity.ok(deliveryDashboardService.getDeliveryDashboardSummary(deliveryPartnerId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// get status of delivery partner
	@GetMapping("/status")
	public ResponseEntity<?> status(@RequestParam Long deliveryPartnerId) {
		System.out.println("In Get status");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(deliveryDashboardService.getDeliveryPartnerStatus(deliveryPartnerId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error:" + e.getMessage());
		}
	}

	// change the status of the delivery partner
	@PatchMapping("/status")
	public ResponseEntity<?> statusUpadate(@RequestParam Long deliveryPartnerId) {
		System.out.println("In Patch status update");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(deliveryDashboardService.toggleDeliveryPartnerStatus(deliveryPartnerId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}

	// get new orders for today that are placed by the customer and accepted by the
	// restaurant.
	@GetMapping("/orders/available")
	public ResponseEntity<?> ordersAvailable(@RequestParam Long deliveryPartnerId) {
		System.out.println("In Get orders-available");

		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(deliveryDashboardService.getNewAvailableDeliveryRequests(deliveryPartnerId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// get orders with order status of a particular delivery partner
	@GetMapping("/orders/{deliveryPartnerId}")
	public ResponseEntity<?> getOrders(@PathVariable Long deliveryPartnerId, @RequestParam OrderStatus status) {
		System.out.println("In get : orders by delivery partner id and status");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrdersByStatus(deliveryPartnerId, status));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}

	// accept order with order id by the delivery partner
	@PatchMapping("/orders/accept")
	public ResponseEntity<?> orderAccept(@RequestParam Long orderId, @RequestParam Long deliveryPartnerId) {
		System.out.println("In Patch order-accept");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(deliveryDashboardService.acceptDeliveryRequest(deliveryPartnerId, orderId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Error : " + e.getMessage());
		}
	}

	// mark order delivered by the delivery partner
	@PatchMapping("/orders/delivered/{deliveryPartnerId}/{orderId}")
	public ResponseEntity<?> orderDelivered(@PathVariable Long orderId, @PathVariable Long deliveryPartnerId) {
		System.out.println("In Patch : order delivered");
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(orderService.deliverOrder(orderId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Error : " + e.getMessage());
		}
	}

}
