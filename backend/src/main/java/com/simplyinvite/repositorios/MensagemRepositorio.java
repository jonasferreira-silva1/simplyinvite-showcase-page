package com.simplyinvite.repositorios;

import com.simplyinvite.modelos.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface MensagemRepositorio extends JpaRepository<Mensagem, UUID> {
} 