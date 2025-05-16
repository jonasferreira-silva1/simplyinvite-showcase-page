package com.simplyinvite.dto.response;

import com.simplyinvite.modelos.Usuario.TipoPerfil;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UUID userId;
    private String email;
    private TipoPerfil tipoPerfil;
    private String fullName;
}