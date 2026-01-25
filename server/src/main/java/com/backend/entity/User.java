package com.backend.entity;


import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;



import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="users")
@AttributeOverride(name="id", column=@Column(name="user_id"))

@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"password","address"})
public class User extends BaseEntity implements UserDetails{
	@Column(name="first_name", length = 50, nullable=false)
	private String firstName;
	
	@Column(name="last_name", length=50)
	private String lastName;
	
	@Column(length=254, unique=true, nullable=false)
	private String email;
	
	@Column(length=255, nullable=false)
	private String password;
	
	@Column(length=15)
	private String phone;
	
	@OneToOne(mappedBy="user", fetch=FetchType.EAGER)
	private Address address;
	
	@Column(nullable=false)
	@Enumerated(EnumType.STRING)
	private UserRole role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(this.role.name());
		return authorities;
	}

	@Override
	public String getUsername() {
		
		return this.email;
	}
	

	
	
	
	
}
