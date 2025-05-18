package com.simplyinvite_showcase_page.backend.controladores;

import com.simplyinvite_showcase_page.backend.modelos.Avaliacao;
import com.simplyinvite_showcase_page.backend.repositorios.AvaliacaoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoControlador {
    @Autowired
    private AvaliacaoRepositorio avaliacaoRepositorio;

    @GetMapping
    public List<Avaliacao> listarAvaliacoes() {
        return avaliacaoRepositorio.findAll();
    }

    @PostMapping
    public ResponseEntity<?> criarAvaliacao(@RequestBody Avaliacao avaliacao) {
        Avaliacao nova = avaliacaoRepositorio.save(avaliacao);
        return ResponseEntity.ok().body(new java.util.HashMap<String, Object>() {{
            put("mensagem", "Cadastrado com sucesso");
            put("avaliacao", nova);
        }});
    }

    @GetMapping("/{id}")
    public Avaliacao buscarAvaliacao(@PathVariable Long id) {
        return avaliacaoRepositorio.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarAvaliacao(@PathVariable Long id, @RequestBody Avaliacao avaliacao) {
        avaliacao.setId(id);
        Avaliacao atualizada = avaliacaoRepositorio.save(avaliacao);
        return ResponseEntity.ok().body(new java.util.HashMap<String, Object>() {{
            put("mensagem", "Atualizado com sucesso");
            put("avaliacao", atualizada);
        }});
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarAvaliacao(@PathVariable Long id) {
        avaliacaoRepositorio.deleteById(id);
        return ResponseEntity.ok().body(new java.util.HashMap<String, Object>() {{
            put("mensagem", "Deletado com sucesso");
        }});
    }
}
