package com.simplyinvite_showcase_page.backend.seguranca;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SegurancaConfig {
    @Autowired
    private JwtFiltro jwtFiltro;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/usuarios").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/jovens", "/api/rh", "/api/gerentes").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/jovens/**", "/api/rh/**", "/api/gerentes/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/jovens/**", "/api/rh/**", "/api/gerentes/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/jovens/**", "/api/rh/**", "/api/gerentes/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFiltro, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
