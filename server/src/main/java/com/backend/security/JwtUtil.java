//package com.backend.security;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import javax.crypto.SecretKey;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.stereotype.Component;
//
//import com.backend.entity.User;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.JwtParser;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import jakarta.annotation.PostConstruct;
//
//@Component
//public class JwtUtil {
//	@Value(value = "${jwt.expiration.time}")
//	public long jwtExpiration;
//	@Value(value = "${jwt.secret.key}")
//	public String jwtSecret;
//	private SecretKey jwtKey;
//	
//	@PostConstruct
//	public void init() {
//		jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
//	}
//	public String createToken(Authentication auth) {
//		User user = (User) auth.getPrincipal();
//		String userId = String.valueOf(user.getId());
//		String roles = user.getAuthorities().stream()
//				.map(authority -> authority.getAuthority())
//				.collect(Collectors.joining(","));
//		
//		String token = Jwts.builder()
//				.setSubject(userId)
//				.claim("roles", roles)
//				.setIssuedAt(new Date())
//				.setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
//				.signWith(jwtKey, SignatureAlgorithm.HS256)
//				.compact();
//		return token;
//	}
//	public Authentication validateToken(String token) {
//		JwtParser parser = Jwts.parserBuilder()
//				.setSigningKey(jwtKey)
//				.build();
//		Claims claims = parser.parseClaimsJws(token).getBody();
//		String custId = claims.getSubject();
//		String roles = (String) claims.get("roles");
//		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
//		Authentication auth = new UsernamePasswordAuthenticationToken(custId, null, authorities);
//		return auth;
//	}
//
//}


package com.backend.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.backend.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component //to declare spring bean
@Slf4j
public class JwtUtil {
//inject the props in JWT Utils class for creating n validation of JWT
	/*
	 * @Value => injection of a value (<constr-arg name n value : xml tags) arg - Spring
	 * expression Lang - SpEL
	 * // example of value injected as dependency , using SpEL
	 * (Spring Expression Language)
	 */
	@Value("${jwt.secret.key}") 	
	private String jwtSecret;

	@Value("${jwt.expiration.time}")
	private int jwtExpirationMs;

	private SecretKey key;//=> represents symmetric key

	@PostConstruct
	public void init() {
		log.info("Key {} Exp Time {}",jwtSecret,jwtExpirationMs);
		/*create secret key instance from  Keys class
		 * Keys - builder of Secret key
		 * Create a Secret Key using HMAC-SHA256 encryption algo.
		 */		
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	// will be invoked by UserSignIn  controller , upon successful
	// authentication
	public String generateJwtToken(Authentication authentication) {
		log.info("generate jwt token " + authentication);// contains verified user details
		User userPrincipal = 
				(User) authentication.getPrincipal();
		return Jwts.builder() // JWTs : a Factory class , used to create JWT tokens
				.setSubject((userPrincipal.getUsername())) // setting subject part of the token
				.setIssuedAt(new Date())// Sets the JWT Claims iat (issued at) value of current date
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))// Sets the JWT Claims exp
																				// (expiration) value.
				// setting a custom claim , to add granted authorities
				.claim("authorities", 
						getAuthoritiesInString(userPrincipal.getAuthorities()))
			
				// setting a custom claim , to add user id (remove it if not required in the
				// project) - future
			

				.signWith(key, SignatureAlgorithm.HS256) // Signs the constructed JWT using the specified
								// algorithm with the specified key, producing a
								// JWS(Json web signature=signed JWT)

				// Using token signing algo : HMAC using SHA-512
				.compact();// Actually builds the JWT and serializes it to a compact, URL-safe string
	}

	// this method will be invoked by our custom JWT filter
	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}

	// this method will be invoked by our custom JWT filter
	public Claims validateJwtToken(String jwtToken) {
		// try {
		JwtParser parser = Jwts.parserBuilder()
				.setSigningKey(key)
				.build();
		Claims claims = parser.parseClaimsJws(jwtToken).getBody();
		
		/*
		 * parseClaimsJws - throws:UnsupportedJwtException -if the JWT body | payload
		 * does not represent any Claims JWSMalformedJwtException - if the JWT body |
		 * payload is not a valid JWSSignatureException - if the JWT signature
		 * validation fails ExpiredJwtException - if the specified JWT is expired
		 * IllegalArgumentException - if the JWT claims body | payload is null or empty
		 * or only whitespace
		 */
		return claims;
	}

	private List<String> getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		return authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
	}

	// this method will be invoked by our custom JWT filter to get list of granted
	// authorities n store it in auth token
	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {

		List<String> authorityNamesFromJwt = 
				(List<String>) claims.get("authorities");
		List<GrantedAuthority> authorities = 
				authorityNamesFromJwt.stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());		

		authorities.forEach(System.out::println);
		return authorities;
	}

	

	public Authentication populateAuthenticationTokenFromJWT(String jwt) {
		// validate JWT n retrieve JWT body (claims)
		Claims payloadClaims = validateJwtToken(jwt);
		// get user name from the claims
		String email = getUserNameFromJwtToken(payloadClaims);
		// get granted authorities as a custom claim
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
			// add user name/email , null:password granted authorities in Authentication object
		UsernamePasswordAuthenticationToken token = 
				new UsernamePasswordAuthenticationToken(email, null, authorities);
//		UsernamePasswordAuthenticationToken token = 
//				new UsernamePasswordAuthenticationToken(new User(email,"", authorities), null, authorities);
//	
		System.out.println("is authenticated " + token.isAuthenticated());// true
		return token;

	}

}

