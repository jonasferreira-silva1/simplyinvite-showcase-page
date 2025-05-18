package com.simplyinvite_showcase_page.backend.controladores;

import com.simplyinvite_showcase_page.backend.modelos.Usuario;
import com.simplyinvite_showcase_page.backend.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioControlador {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Endpoints para Jovens (Talents)
    @GetMapping("/api/jovens")
    public List<Usuario> listarJovens() {
        return usuarioRepositorio.findByTipoPerfil("talent");
    }

    @PostMapping("/api/jovens")
    public Usuario criarJovem(@RequestBody Usuario usuario) {
        usuario.setTipoPerfil("talent");
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepositorio.save(usuario);
    }

    @GetMapping("/api/jovens/{id}")
    public Usuario buscarJovem(@PathVariable Long id) {
        return usuarioRepositorio.findByIdAndTipoPerfil(id, "talent")
                .orElse(null);
    }

    @PutMapping("/api/jovens/{id}")
    public Usuario atualizarJovem(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        usuario.setTipoPerfil("talent");
        return usuarioRepositorio.save(usuario);
    }

    @DeleteMapping("/api/jovens/{id}")
    public void deletarJovem(@PathVariable Long id) {
        usuarioRepositorio.deleteById(id);
    }

    // Endpoints para RH
    @GetMapping("/api/rh")
    public List<Usuario> listarRH() {
        return usuarioRepositorio.findByTipoPerfil("hr");
    }

    @PostMapping("/api/rh")
    public Usuario criarRH(@RequestBody Usuario usuario) {
        usuario.setTipoPerfil("hr");
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepositorio.save(usuario);
    }

    @GetMapping("/api/rh/{id}")
    public Usuario buscarRH(@PathVariable Long id) {
        return usuarioRepositorio.findByIdAndTipoPerfil(id, "hr")
                .orElse(null);
    }

    @PutMapping("/api/rh/{id}")
    public Usuario atualizarRH(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        usuario.setTipoPerfil("hr");
        return usuarioRepositorio.save(usuario);
    }

    @DeleteMapping("/api/rh/{id}")
    public void deletarRH(@PathVariable Long id) {
        usuarioRepositorio.deleteById(id);
    }

    // Endpoints para Gerentes
    @GetMapping("/api/gerentes")
    public List<Usuario> listarGerentes() {
        return usuarioRepositorio.findByTipoPerfil("manager");
    }

    @PostMapping("/api/gerentes")
    public Usuario criarGerente(@RequestBody Usuario usuario) {
        usuario.setTipoPerfil("manager");
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepositorio.save(usuario);
    }

    @GetMapping("/api/gerentes/{id}")
    public Usuario buscarGerente(@PathVariable Long id) {
        return usuarioRepositorio.findByIdAndTipoPerfil(id, "manager")
                .orElse(null);
    }

    @PutMapping("/api/gerentes/{id}")
    public Usuario atualizarGerente(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        usuario.setTipoPerfil("manager");
        return usuarioRepositorio.save(usuario);
    }

    @DeleteMapping("/api/gerentes/{id}")
    public void deletarGerente(@PathVariable Long id) {
        usuarioRepositorio.deleteById(id);
    }
}
