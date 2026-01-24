package com.backend.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class MenuDishId implements Serializable{
	private Long menuId;
	private Long dishId;
}
