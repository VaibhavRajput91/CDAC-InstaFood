package com.backend.service;

import org.modelmapper.ModelMapper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dto.AuthenticationRequest;
import com.backend.dto.AuthenticationResponse;
import com.backend.dto.customer.UserPasswordUpdateDTO;
import com.backend.dto.customer.UserRequestDTO;
import com.backend.dto.customer.UserResponseDTO;
import com.backend.dto.customer.UserUpdateDTO;
import com.backend.entity.Address;
import com.backend.entity.User;
import com.backend.repository.AddressRepository;
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
	private final AddressRepository addressRepository;

   
	
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
		Address address = modelMapper.map(userReq, Address.class);
		address.setUser(newUser);
		userRepository.save(newUser);
		addressRepository.save(address);
		UserResponseDTO responseUser = modelMapper.map(newUser, UserResponseDTO.class);
		responseUser.setPostalCode(address.getPostalCode());
		return responseUser;
	}
	@Override
	public AuthenticationResponse loadUser(AuthenticationRequest authUser) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public UserResponseDTO updateUser(Long id, UserUpdateDTO userReq) {
		
			User existingUser = userRepository.findById(id).orElseThrow(
					()-> new RuntimeException("User Not Found")
					);
			modelMapper.map(userReq, existingUser);
			userRepository.save(existingUser);
			existingUser.getAddress().setCity(userReq.getCity());
			existingUser.getAddress().setLineOne(userReq.getLineOne());
			existingUser.getAddress().setLineTwo(userReq.getLineTwo());
			existingUser.getAddress().setPostalCode(userReq.getPostalCode());
			existingUser.getAddress().setState(userReq.getState());
			addressRepository.save(existingUser.getAddress());
			UserResponseDTO responseUser = modelMapper.map(existingUser, UserResponseDTO.class);
			responseUser.setPostalCode(existingUser.getAddress().getPostalCode());
			return responseUser;
		
	}
	@Override
	public String updateUserPassword(UserPasswordUpdateDTO newCred) {
		
		User existingUser = userRepository.findByEmail(newCred.getEmail()).orElseThrow(
				()-> new RuntimeException("User Not Found")
				);
		if(existingUser.getPassword()!=null) {
			if(!passwordEncoder.matches(newCred.getCurrentPassword(), existingUser.getPassword()))
			{
				throw new RuntimeException("Old Password is Incorrect");
			}
		}
		existingUser.setPassword(passwordEncoder.encode(newCred.getNewPassword()));
		userRepository.save(existingUser);
		return "Password Updated Successfully";
		
	}
	 
}
