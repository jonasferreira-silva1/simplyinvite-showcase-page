package com.simplyinvite.servicos;

import com.simplyinvite.modelos.Mensagem;
import com.simplyinvite.repositorios.MensagemRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MensagemServico {
    @Autowired
    private MensagemRepositorio mensagemRepositorio;

    public List<Mensagem> listarTodos() {
        return mensagemRepositorio.findAll();
    }

    public Mensagem salvar(Mensagem mensagem) {
        return mensagemRepositorio.save(mensagem);
    }

    public Mensagem buscarPorId(UUID id) {
        return mensagemRepositorio.findById(id).orElse(null);
    }

    public void deletar(UUID id) {
        mensagemRepositorio.deleteById(id);
    }
} 