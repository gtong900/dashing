package com.tiffend.dashing.repository;

import com.tiffend.dashing.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}



