package com.tiffend.dashing.controller;

import com.tiffend.dashing.jwt.JwtTokenProvider;
import com.tiffend.dashing.model.Role;
import com.tiffend.dashing.model.Transaction;
import com.tiffend.dashing.model.User;
import com.tiffend.dashing.service.ProductService;
import com.tiffend.dashing.service.TransactionService;
import com.tiffend.dashing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
public class UserController {

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserService userService;

	@Autowired
	private ProductService productService;

	@Autowired
	private TransactionService transactionService;

	@PostMapping("/api/user/registration")
	public ResponseEntity<?> register(@RequestBody User user) {
		if (userService.findByUsername(user.getUsername()) != null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		user.setRole(Role.USER);
		return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
	}

	@GetMapping("api/user/login")
	public ResponseEntity<?> getUser(Principal principal) {
		if (principal == null) {
			return ResponseEntity.ok(principal);
		}
		UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
		User user = userService.findByUsername(authenticationToken.getName());
		user.setToken(tokenProvider.generateToken(authenticationToken));
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@PostMapping("/api/user/purchase")
	public ResponseEntity<?> purchaseProduct(@RequestBody Transaction transaction) {
		transaction.setPurchaseDate(LocalDateTime.now());
		return new ResponseEntity<>(transactionService.saveTransaction(transaction), HttpStatus.CREATED);
	}

	@GetMapping("/api/user/products")
	public ResponseEntity<?> getAllProducts() {
		return new ResponseEntity<>(productService.findAllProducts(), HttpStatus.OK);
	}

	@GetMapping("/api/user/test")
	public ResponseEntity<?> test() {
		return new ResponseEntity<>("It's good here.", HttpStatus.OK);
	}
}
