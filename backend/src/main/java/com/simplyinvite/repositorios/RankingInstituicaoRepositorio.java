package com.simplyinvite.repositorios;

import com.simplyinvite.modelos.RankingInstituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RankingInstituicaoRepositorio extends JpaRepository<RankingInstituicao, UUID> {
} 