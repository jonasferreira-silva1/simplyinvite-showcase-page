package com.simplyinvite.servicos;

import com.simplyinvite.modelos.Usuario;
import com.simplyinvite.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UsuarioServico {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<Usuario> listarTodos() {
        return usuarioRepositorio.findAll();
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    public Usuario buscarPorId(UUID id) {
        return usuarioRepositorio.findById(id).orElse(null);
    }

    public void deletar(UUID id) {
        usuarioRepositorio.deleteById(id);
    }
} 