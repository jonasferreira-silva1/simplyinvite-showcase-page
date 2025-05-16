package com.simplyinvite.modelos;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

    @Column(nullable = false)
    private String avaliador; // Pode ser um relacionamento com Usuario futuramente

    @Column
    private Integer nota;

    @Column
    private String feedback;

    @Column
    private String medalha; // OURO, PRATA, BRONZE

    // getters e setters
} 