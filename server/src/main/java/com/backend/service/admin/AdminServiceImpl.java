package com.backend.service.admin;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.backend.dto.admin.AdminProfileDTO;
import com.backend.entity.User;
import com.backend.entity.UserRole;
import com.backend.repository.admin.AdminProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

	private final AdminProfileRepository adminProfileRepository;
	
	private final ModelMapper modelMapper;

	@Override
	public AdminProfileDTO getAdminDetails() {
		User user = adminProfileRepository.findByRole(UserRole.ROLE_ADMIN).orElseThrow(()->new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User Not Found"
            ));
		System.out.println(user);
		AdminProfileDTO adminProfile = modelMapper.map(user, AdminProfileDTO.class);
		return adminProfile;
	}
}
