package com.simplyinvite_showcase_page.backend.service.impl;

import com.simplyinvite_showcase_page.backend.dto.UsuarioDTO;
import com.simplyinvite_showcase_page.backend.service.UsuarioService;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    
    @Override
    public UsuarioDTO criar(UsuarioDTO usuarioDTO) {
        // TODO: Implementar lógica de criação
        return usuarioDTO;
    }
} 