package com.simplyinvite.repositorios;

import com.simplyinvite.modelos.Relatorio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RelatorioRepositorio extends JpaRepository<Relatorio, UUID> {
} 