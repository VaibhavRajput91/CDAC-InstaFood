package com.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dto.AuthenticationRequest;
import com.backend.dto.AuthenticationResponse;
import com.backend.dto.UserRequestDTO;
import com.backend.dto.UserResponseDTO;
import com.backend.entity.User;
import com.backend.repository.UserRepository;
import com.backend.security.SecurityConfig;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    

	
	private final UserRepository userRepository;
	
	private final ModelMapper modelMapper;
	
	private final PasswordEncoder passwordEncoder;

   
	
	@Override
	public UserResponseDTO registerUser(UserRequestDTO userReq) {
		
		if(userRepository.existsByEmail(userReq.getEmail()))
		{
			throw new RuntimeException("Email Already Exist");
		}
		User newUser = modelMapper.map(userReq,User.class);
		newUser.setPassword(
				passwordEncoder.encode(userReq.getPassword())
				);
		newUser = userRepository.save(newUser);
		return modelMapper.map(newUser, UserResponseDTO.class);
	}
	@Override
	public AuthenticationResponse loadUser(AuthenticationRequest authUser) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
