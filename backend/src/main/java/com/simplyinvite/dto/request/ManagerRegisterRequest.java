package com.simplyinvite.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ManagerRegisterRequest {
    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
    private String password;

    @NotBlank(message = "O nome completo é obrigatório")
    @Size(min = 3, message = "O nome deve ter pelo menos 3 caracteres")
    private String fullName;

    @NotBlank(message = "O nome da empresa é obrigatório")
    private String company;

    @NotBlank(message = "O cargo é obrigatório")
    private String position;

    @NotBlank(message = "A área de busca de talentos é obrigatória")
    private String talentSearchArea;
} 