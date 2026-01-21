package com.backend.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="reviews")
@AttributeOverride(name="id", column=@Column(name="review_id"))

@Getter
@Setter
@ToString
public class Review extends BaseEntity {
	@OneToOne
	@JoinColumn(name="order_id")
	private Order order;
	
	@ManyToOne
	@JoinColumn(name="reviewer_id")
	private User reviewer;
	
	@Column(name="review_for")
	@Enumerated(EnumType.STRING)
	private ReviewFor reviewFor;
}
