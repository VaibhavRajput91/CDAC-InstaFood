package com.backend.dto.customer;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class UserPasswordUpdateDTO {
	private String currentPassword;
	private String newPassword;

}
