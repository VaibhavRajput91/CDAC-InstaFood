package com.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.UserRequestDTO;
import com.backend.dto.UserResponseDTO;
import com.backend.entity.User;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	@Autowired
	private final UserRepository userRepository;
	@Autowired
	private final ModelMapper modelMapper;
	@Override
	public User getCustomerById(Long userId) {
		User user = userRepository.findUserById(userId)
				.orElseThrow(() -> new RuntimeException("Invalid User ID !!"));
		return user;
	}
	@Override
	public UserResponseDTO registerCustomer(UserRequestDTO userReq) {
		
		if(userRepository.existsByEmail(userReq.getEmail()))
		{
			throw new RuntimeException("Email Already Exist");
		}
		User newUser = modelMapper.map(userReq,User.class);
		newUser = userRepository.save(newUser);
		return modelMapper.map(newUser, UserResponseDTO.class);
	}
	

}
