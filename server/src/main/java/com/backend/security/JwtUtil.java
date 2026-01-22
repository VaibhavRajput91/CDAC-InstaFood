package com.backend.security;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import com.backend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {
	@Value(value = "${jwt.expiration.time}")
	public long jwtExpiration;
	@Value(value = "${jwt.secret.key}")
	public String jwtSecret;
	private SecretKey jwtKey;
	
	@PostConstruct
	public void init() {
		jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	public String createToken(Authentication auth) {
		User user = (User) auth.getPrincipal();
		String userId = String.valueOf(user.getId());
		String roles = user.getAuthorities().stream()
				.map(authority -> authority.getAuthority())
				.collect(Collectors.joining(","));
		
		String token = Jwts.builder()
				.setSubject(userId)
				.claim("roles", roles)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
				.signWith(jwtKey, SignatureAlgorithm.HS256)
				.compact();
		return token;
	}
	public Authentication validateToken(String token) {
		JwtParser parser = Jwts.parserBuilder()
				.setSigningKey(jwtKey)
				.build();
		Claims claims = parser.parseClaimsJws(token).getBody();
		String custId = claims.getSubject();
		String roles = (String) claims.get("roles");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
		Authentication auth = new UsernamePasswordAuthenticationToken(custId, null, authorities);
		return auth;
	}

}
