package com.simplyinvite_showcase_page.backend.modelos;

import jakarta.persistence.*;

@Entity
@Table(name = "avaliacoes")
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long projetoId;

    @Column(nullable = false)
    private Long avaliadorId;

    @Column(nullable = false)
    private String comentario;

    @Column(nullable = false)
    private Integer nota;

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProjetoId() { return projetoId; }
    public void setProjetoId(Long projetoId) { this.projetoId = projetoId; }
    public Long getAvaliadorId() { return avaliadorId; }
    public void setAvaliadorId(Long avaliadorId) { this.avaliadorId = avaliadorId; }
    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
    public Integer getNota() { return nota; }
    public void setNota(Integer nota) { this.nota = nota; }
}
