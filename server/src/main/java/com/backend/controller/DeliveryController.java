package com.backend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.demo;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {
	
	@PostMapping("/add-partner")
	public ResponseEntity<?> addPartner(@RequestBody demo demo_dto_form_details){
		System.out.println("In Post add-partner");
		try {
			return ResponseEntity.ok("Form Submission");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	@GetMapping("/wallet/summary")
	public ResponseEntity<?> walletSummary(){
		System.out.println("In Get wallet/summary");
		try {
			return ResponseEntity.ok("display transaction stats{wallet balance}");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}

	@GetMapping("/wallet/transactions")
	public ResponseEntity<?> walletTransactions(@RequestParam int size){
		System.out.println("In Get wallet/transactions?size");
		try {
			return ResponseEntity.ok("view past "+size+" transactions");
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
	public ResponseEntity<?> walletEarningsTrend(@RequestParam String range){
		System.out.println("In Get Wallet/Earinings-Trend");
		try {
			return ResponseEntity.ok("graph for earnings trend based on "+range);
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
	
	
	@GetMapping("/details")
	public ResponseEntity<?> profile(){
		System.out.println("In Get details");
		try {
			return ResponseEntity.ok("user details, vehicle details and month performance in a single json object");
		}
		catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Error");
		}
	}
	
//	@GetMapping("/")
//	public  ResponseEntity<?> editProfile(){
//		
//	}
	
	
	
	
	
	
	
	
}
