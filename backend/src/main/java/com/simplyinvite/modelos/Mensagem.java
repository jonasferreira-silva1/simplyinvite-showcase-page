package com.simplyinvite.modelos;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Mensagem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String conteudo;

    @Column(nullable = false)
    private String remetente;

    @Column(nullable = false)
    private String destinatario;

    // getters e setters
} 