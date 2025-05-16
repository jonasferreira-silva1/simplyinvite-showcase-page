package com.simplyinvite.repositorios;

import com.simplyinvite.modelos.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface AvaliacaoRepositorio extends JpaRepository<Avaliacao, UUID> {
} 