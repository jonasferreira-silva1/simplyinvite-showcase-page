package com.simplyinvite.controladores;

import com.simplyinvite.modelos.Projeto;
import com.simplyinvite.repositorios.ProjetoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/projetos")
public class ProjetoControlador {

    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    // CRIAR
    @PostMapping
    public ResponseEntity<Projeto> criarProjeto(@RequestBody Projeto projeto) {
        Projeto salvo = projetoRepositorio.save(projeto);
        return ResponseEntity.ok(salvo);
    }

    // LISTAR TODOS
    @GetMapping
    public ResponseEntity<List<Projeto>> listarProjetos() {
        return ResponseEntity.ok(projetoRepositorio.findAll());
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscarProjetoPorId(@PathVariable UUID id) {
        Optional<Projeto> projeto = projetoRepositorio.findById(id);
        return projeto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<Projeto> atualizarProjeto(@PathVariable UUID id, @RequestBody Projeto atualizado) {
        return projetoRepositorio.findById(id)
                .map(projeto -> {
                    projeto.setTitulo(atualizado.getTitulo());
                    projeto.setDescricao(atualizado.getDescricao());
                    projeto.setCategoria(atualizado.getCategoria());
                    projeto.setStatus(atualizado.getStatus());
                    Projeto salvo = projetoRepositorio.save(projeto);
                    return ResponseEntity.ok(salvo);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProjeto(@PathVariable UUID id) {
        if (projetoRepositorio.existsById(id)) {
            projetoRepositorio.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
} 