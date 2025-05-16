package com.simplyinvite.repositorios;

import com.simplyinvite.modelos.PerfilTalento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PerfilTalentoRepositorio extends JpaRepository<PerfilTalento, UUID> {
} 