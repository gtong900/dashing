package com.tiffend.dashing.repository;

import com.tiffend.dashing.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
