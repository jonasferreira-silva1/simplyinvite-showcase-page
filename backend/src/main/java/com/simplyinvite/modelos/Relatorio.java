package com.simplyinvite.modelos;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Relatorio {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String tipo; // Exemplo: desempenho, medalhas, categorias

    @Column(nullable = false)
    private String descricao;

    // getters e setters
} 