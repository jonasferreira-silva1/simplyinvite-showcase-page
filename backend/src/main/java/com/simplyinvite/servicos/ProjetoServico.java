package com.simplyinvite.servicos;

import com.simplyinvite.modelos.Projeto;
import com.simplyinvite.repositorios.ProjetoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    public List<Projeto> listarTodos() {
        return projetoRepositorio.findAll();
    }

    public Projeto salvar(Projeto projeto) {
        return projetoRepositorio.save(projeto);
    }

    public Projeto buscarPorId(UUID id) {
        return projetoRepositorio.findById(id).orElse(null);
    }

    public void deletar(UUID id) {
        projetoRepositorio.deleteById(id);
    }
} 