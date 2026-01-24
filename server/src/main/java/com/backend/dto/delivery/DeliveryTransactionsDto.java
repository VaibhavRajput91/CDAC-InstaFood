package com.backend.dto.delivery;

import com.backend.entity.OrderStatus;

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
public class DeliveryTransactionsDto {
    private Long orderId;
    private OrderStatus orderStatus;
    private double earnings;
}