package com.simplyinvite.servicos;

import com.simplyinvite.modelos.PerfilTalento;
import com.simplyinvite.repositorios.PerfilTalentoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PerfilTalentoServico {
    @Autowired
    private PerfilTalentoRepositorio perfilTalentoRepositorio;

    public List<PerfilTalento> listarTodos() {
        return perfilTalentoRepositorio.findAll();
    }

    public PerfilTalento salvar(PerfilTalento perfilTalento) {
        return perfilTalentoRepositorio.save(perfilTalento);
    }

    public PerfilTalento buscarPorId(UUID id) {
        return perfilTalentoRepositorio.findById(id).orElse(null);
    }

    public void deletar(UUID id) {
        perfilTalentoRepositorio.deleteById(id);
    }
} 