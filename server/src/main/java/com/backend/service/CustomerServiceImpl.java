package com.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.backend.dto.UserProfileDTO;
import com.backend.entity.User;
import com.backend.entity.UserRole;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	private final UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Override
	public UserProfileDTO getCustomerById(Long userId) {
		User user = userRepository.findByIdAndRole(userId, UserRole.ROLE_CUSTOMER).orElseThrow(()->new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User Not Found"
            ));
		System.out.println(user);
		UserProfileDTO userProfile = modelMapper.map(user, UserProfileDTO.class);
		return userProfile;
	}

}
