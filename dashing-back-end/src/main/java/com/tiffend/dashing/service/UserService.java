package com.tiffend.dashing.service;

import com.tiffend.dashing.model.User;

import java.util.List;

public interface UserService {
	User saveUser(User user);

	User updateUser(User user);

	void deleteUser(Long userId);

	User findByUsername(String username);

	List<User> findAllUser();

	Long numberOfUsers();
}
