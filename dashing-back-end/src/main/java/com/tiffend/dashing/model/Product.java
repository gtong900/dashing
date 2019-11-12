package com.tiffend.dashing.model;

import lombok.Data;

import javax.persistence.*;

@Data//handle get set hashcode equals
@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "price")
	private String price;

	@Column(name = "description")
	private String description;
}
