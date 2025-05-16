package com.simplyinvite.modelos;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class RankingInstituicao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nomeInstituicao;

    @Column(nullable = false)
    private String tipo; // Pública ou Privada

    @Column(nullable = false)
    private Integer contratações;

    @Column(nullable = false)
    private String localizacao;

    @Column
    private Double avaliacao;

    // getters e setters
} 