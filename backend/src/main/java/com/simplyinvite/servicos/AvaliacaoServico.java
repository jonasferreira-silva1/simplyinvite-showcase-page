package com.simplyinvite.servicos;

import com.simplyinvite.modelos.Avaliacao;
import com.simplyinvite.repositorios.AvaliacaoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AvaliacaoServico {
    @Autowired
    private AvaliacaoRepositorio avaliacaoRepositorio;

    public List<Avaliacao> listarTodos() {
        return avaliacaoRepositorio.findAll();
    }

    public Avaliacao salvar(Avaliacao avaliacao) {
        return avaliacaoRepositorio.save(avaliacao);
    }

    public Avaliacao buscarPorId(UUID id) {
        return avaliacaoRepositorio.findById(id).orElse(null);
    }

    public void deletar(UUID id) {
        avaliacaoRepositorio.deleteById(id);
    }
} 