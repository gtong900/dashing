package com.tiffend.dashing.service;

import com.tiffend.dashing.model.Transaction;

import java.util.List;

public interface TransactionService {
	Transaction saveTransaction(Transaction transaction);

	Long numberOfTransactions();

	List<Transaction> findAllTransactions();
}
