//package com.backend.security;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import lombok.AllArgsConstructor;
//
//@EnableWebSecurity
//@Configuration
//@AllArgsConstructor
//public class SecurityConfig {
//	
//	
//	@Autowired
//	private final JwtFilter jwtFilter;
//	
//	@Autowired
//	private final CustomUserDetailsServiceImpl customUserDetailsService;
//	
//	
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//	
//	@Bean
//	AuthenticationManager authenticationmanager(HttpSecurity http) throws Exception {
//		AuthenticationManagerBuilder authManagerBuilder=
//				http.getSharedObject(AuthenticationManagerBuilder.class);
//		authManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
//		return authManagerBuilder.build();
//	}
//	@Bean
//	SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
//		http.csrf(csrf -> csrf.disable())
//			.authorizeHttpRequests(auth -> auth
//					.requestMatchers("/user/sign-in", "/user/sign-up").permitAll()
//					.requestMatchers("/**").permitAll()
//					.anyRequest().authenticated()
//			)
//			.addFilterBefore(jwtFilter, 
//					UsernamePasswordAuthenticationFilter.class)
//			.sessionManagement(session -> 
//				session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//			);
//		return http.build();
//	}
//
//}

package com.backend.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;

@Configuration // to declare config class - to declare spring beans - @Bean)
@EnableWebSecurity // to customize spring security
@EnableMethodSecurity // to enable method level annotations
//(@PreAuthorize , @PostAuthorize..) to specify  authorization rules
@AllArgsConstructor
public class SecurityConfig {
	// depcy - password encoder
	
	private final JwtFilter JwtFilter;
	private final JwtAuthEntryPoint jwtAuthEntryPoint;
	
	/*
	 * configure spring bean to customize spring security filter chain disable CSRF
	 * protection - session creation policy - stateless - disable form login based
	 * authentication - enable basic authentication scheme , for REST clients
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// 1. Disable CSRF protection
		http.csrf(csrf -> csrf.disable());
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		// 2. Authenticate any request
		http.authorizeHttpRequests(request ->
		// 3.permit all - swagger , view all restaurants , user signin , sign up....
		request.anyRequest().permitAll());
		
		// 5. set session creation policy - stateless
		http.sessionManagement(session -> 
		session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// 6. add custom JWT filter before -UserNamePasswordAuthFilter
		http.addFilterBefore(JwtFilter, UsernamePasswordAuthenticationFilter.class);
		// 7. Customize error code of SC 401 | SC 403, in case of authentication failure
		http.exceptionHandling(ex -> 
		ex.authenticationEntryPoint(jwtAuthEntryPoint));
		return http.build();
	}

	// configure a spring to return Spring security authentication manager
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration mgr) throws Exception {
		return mgr.getAuthenticationManager();
	}
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

	    CorsConfiguration config = new CorsConfiguration();

	    config.setAllowedOrigins(List.of("http://localhost:5173"));
	    config.setAllowedMethods(List.of(
	            "GET", "POST", "PUT", "DELETE", "OPTIONS"
	    ));
	    config.setAllowedHeaders(List.of("*"));
	    config.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source =
	            new UrlBasedCorsConfigurationSource();

	    source.registerCorsConfiguration("/**", config);

	    return source;
	}

	

}

