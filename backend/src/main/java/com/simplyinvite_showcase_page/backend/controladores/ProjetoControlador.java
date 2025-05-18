package com.simplyinvite_showcase_page.backend.controladores;

import com.simplyinvite_showcase_page.backend.modelos.Projeto;
import com.simplyinvite_showcase_page.backend.repositorios.ProjetoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projetos")
public class ProjetoControlador {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    @GetMapping
    public List<Projeto> listarProjetos() {
        return projetoRepositorio.findAll();
    }

    @PostMapping
    public Projeto criarProjeto(@RequestBody Projeto projeto) {
        return projetoRepositorio.save(projeto);
    }

    @GetMapping("/{id}")
    public Projeto buscarProjeto(@PathVariable Long id) {
        return projetoRepositorio.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Projeto atualizarProjeto(@PathVariable Long id, @RequestBody Projeto projeto) {
        projeto.setId(id);
        return projetoRepositorio.save(projeto);
    }

    @DeleteMapping("/{id}")
    public void deletarProjeto(@PathVariable Long id) {
        projetoRepositorio.deleteById(id);
    }
}
