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
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="reviews")
@AttributeOverride(name="id", column=@Column(name="review_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Review extends BaseEntity {
	@OneToOne
	@JoinColumn(name="order_id", nullable=false)
	private Order order;
	
	@ManyToOne
	@JoinColumn(name="reviewer_id", nullable=false)
	private User reviewer;
	
	@Column(name="review_for")
	@Enumerated(EnumType.STRING)
	private ReviewFor reviewFor;
	
	@Column(nullable=false)
	@Min(1)
	@Max(5)
	private int rating;
	
	@Column(length=250)
	private String notes;
}
