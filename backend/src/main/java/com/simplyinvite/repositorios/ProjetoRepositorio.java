package com.simplyinvite.repositorios;

import com.simplyinvite.modelos.Projeto;
import com.simplyinvite.modelos.Projeto.StatusProjeto;
import com.simplyinvite.modelos.PerfilTalento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProjetoRepositorio extends JpaRepository<Projeto, UUID> {
    Page<Projeto> findByPerfilTalento(PerfilTalento perfilTalento, Pageable pageable);
    Page<Projeto> findByStatus(StatusProjeto status, Pageable pageable);
    Page<Projeto> findByCategoria(String categoria, Pageable pageable);
    // Page<Projeto> findByPerfilTalentoCidade(String cidade, Pageable pageable);
}