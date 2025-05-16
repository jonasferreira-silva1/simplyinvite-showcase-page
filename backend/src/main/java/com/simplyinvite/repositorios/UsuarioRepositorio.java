package com.simplyinvite.repositorios;

import com.simplyinvite.modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UsuarioRepositorio extends JpaRepository<Usuario, UUID> {
    Usuario findByEmail(String email);
} 