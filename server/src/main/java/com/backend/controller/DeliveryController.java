package com.backend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.demo;
import com.backend.dto.delivery.DeliveryPartnerApplyDto;
import com.backend.dto.delivery.DeliveryProfileDto;
import com.backend.dto.delivery.DeliveryWalletSummaryDto;
import com.backend.service.delivery.ApplyForDeliveryService;
import com.backend.service.delivery.DeliveryOrderService;
import com.backend.service.delivery.DeliveryOrderServiceImpl;
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
	
	@PostMapping("/apply")
	public ResponseEntity<?> addPartner(@RequestBody DeliveryPartnerApplyDto applyDto, @RequestParam Long userId){
		System.out.println("In Post add-partner");
		try {
			applyForDeliveryService.applyForDeliveryPartner(userId, applyDto);
			return ResponseEntity.status(HttpStatus.CREATED).body("Applied successfully");
		}
		catch(RuntimeException e) { 
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}
	
	@GetMapping("/wallet/summary")
	public ResponseEntity<?> walletSummary(@RequestParam Long deliveryPartnerId){
		System.out.println("In Get wallet/summary");
		
		try {
			DeliveryWalletSummaryDto walletSummary = deliveryWalletService.getWalletSummary(deliveryPartnerId);
			return ResponseEntity.status(HttpStatus.OK).body(walletSummary);
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}

	@GetMapping("/wallet/transactions")
	public ResponseEntity<?> walletTransactions(@RequestParam Long deliveryPartnerId, @RequestParam int size){
		System.out.println("In Get wallet/transactions?size");
		try {
			return ResponseEntity.ok(deliveryWalletService.getTransactions(deliveryPartnerId, size));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	@PutMapping("/wallet/cash-out")
	public ResponseEntity<?> walletCashOut(@RequestBody demo demo_dto_id_and_zerobalance){
		System.out.println("In Put wallet/cash-out");
		try {
			return ResponseEntity.ok("wallet balance 0 i.e. transferred to user account");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	@GetMapping("/wallet/earnings-trend")
	public ResponseEntity<?> walletEarningsTrend(@RequestParam String range, @RequestParam Long deliveryPartnerId){
		System.out.println("In Get Wallet/Earinings-Trend");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(deliveryWalletService.getEarningsList(range, deliveryPartnerId));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	
	
	@GetMapping("/details")
	public ResponseEntity<?> profile(@RequestParam Long id){
		System.out.println("In Get details");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(deliveryProfileService.getDeliveryPartnerProfile(id));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}
	
	@PutMapping("/edit-details")
	public  ResponseEntity<?> editProfile(@RequestBody DeliveryProfileDto profileDto, @RequestParam Long id){
		System.out.println("In Put Edit-Details");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(deliveryProfileService.updateDeliveryPartnerProfile(id, profileDto));	
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}
	
	
	@GetMapping("/orders")
	public ResponseEntity<?> orders(@RequestParam Long deliveryPartnerId){
		System.out.println("In Get Orders");
		try{
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(orderService.getTodayOrdersList(deliveryPartnerId, null));
		}
		catch(RuntimeException e) {
			System.out.print(e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("error : " + e.getMessage());
		}
	}
	
	@GetMapping("/orders/order-details")
	public ResponseEntity<?> orderDetails(@RequestParam Long id){
		System.out.println("In Get Orders/order-details");
		try{
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(orderService.getOrderDetails(id));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}
	
	@GetMapping("orders/history")
	public ResponseEntity<?> orderHistory(@RequestParam Long id){
		System.out.print("In delivery order history");
		try {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(orderService.getOrdersHistory(id, 20));
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error : " + e.getMessage());
		}
	}
	
	@GetMapping("/dashboard/summary")
	public ResponseEntity<?> dashboardSummary(){
		System.out.println("In Get dashboard/summary");
		try {
			return ResponseEntity.ok("top half of the dashboard page(earnings, order, wallet, stats, etc)");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	@GetMapping("/status")
	public ResponseEntity<?> status(){
		System.out.println("In Get status");
		try {
			return ResponseEntity.ok("delivery partner online or not");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	@PatchMapping("/status")
	public ResponseEntity<?> statusUpadate(@RequestBody demo demo_dto_to_update_status){
		System.out.println("In Patch status update");
		try {
			return ResponseEntity.ok("update online status");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	
	@GetMapping("/orders/available")
	public ResponseEntity<?> ordersAvailable(@RequestParam int since){
		System.out.println("In Get orders-available");
		try {
			return ResponseEntity.ok("(auto-refresh)list of currently placed orders under "+since+" ms");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	
	@PostMapping("/orders/accept/{orderId}")
	public ResponseEntity<?> orderAccept(@PathVariable int orderId, @RequestBody demo demo_dto_for_order){
		System.out.println("In Get order-accept");
		try {
			return ResponseEntity.ok("accepted an order with orderId="+orderId);
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	
	//delivery/notifications/unread-count (maintain notification count) {optional}
	
	
	
	
	
	
	
	
}