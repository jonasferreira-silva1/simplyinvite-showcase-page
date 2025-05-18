package com.simplyinvite_showcase_page.backend.controladores;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.simplyinvite_showcase_page.backend.modelos.Usuario;
import com.simplyinvite_showcase_page.backend.repositorios.UsuarioRepositorio;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UsuarioControlador.class)
public class UsuarioControladorTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UsuarioRepositorio usuarioRepositorio;

    @Test
    public void listarUsuarios_DeveRetornarListaDeUsuarios() throws Exception {
        // Arrange
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        usuario1.setEmail("teste1@email.com");
        usuario1.setNomeCompleto("Teste 1");
        usuario1.setTipoPerfil("talent");

        Usuario usuario2 = new Usuario();
        usuario2.setId(2L);
        usuario2.setEmail("teste2@email.com");
        usuario2.setNomeCompleto("Teste 2");
        usuario2.setTipoPerfil("hr");

        when(usuarioRepositorio.findAll()).thenReturn(Arrays.asList(usuario1, usuario2));

        // Act & Assert
        mockMvc.perform(get("/api/usuarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("teste1@email.com"))
                .andExpect(jsonPath("$[1].email").value("teste2@email.com"));
    }

    @Test
    public void criarUsuario_ComDadosValidos_DeveRetornarUsuarioCriado() throws Exception {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setEmail("novo@email.com");
        usuario.setSenha("senha123");
        usuario.setNomeCompleto("Novo Usuario");
        usuario.setTipoPerfil("talent");

        when(usuarioRepositorio.save(any(Usuario.class))).thenReturn(usuario);

        // Act & Assert
        mockMvc.perform(post("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuario)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("novo@email.com"))
                .andExpect(jsonPath("$.nomeCompleto").value("Novo Usuario"));
    }

    @Test
    public void buscarUsuario_ComIdExistente_DeveRetornarUsuario() throws Exception {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("teste@email.com");
        usuario.setNomeCompleto("Teste");
        usuario.setTipoPerfil("talent");

        when(usuarioRepositorio.findById(1L)).thenReturn(Optional.of(usuario));

        // Act & Assert
        mockMvc.perform(get("/api/usuarios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("teste@email.com"))
                .andExpect(jsonPath("$.nomeCompleto").value("Teste"));
    }

    @Test
    public void buscarUsuario_ComIdInexistente_DeveRetornarNull() throws Exception {
        // Arrange
        when(usuarioRepositorio.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/usuarios/999"))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    public void atualizarUsuario_ComDadosValidos_DeveRetornarUsuarioAtualizado() throws Exception {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("atualizado@email.com");
        usuario.setNomeCompleto("Usuario Atualizado");
        usuario.setTipoPerfil("hr");

        when(usuarioRepositorio.save(any(Usuario.class))).thenReturn(usuario);

        // Act & Assert
        mockMvc.perform(put("/api/usuarios/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(usuario)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("atualizado@email.com"))
                .andExpect(jsonPath("$.nomeCompleto").value("Usuario Atualizado"));
    }

    @Test
    public void deletarUsuario_ComIdExistente_DeveRetornarOk() throws Exception {
        // Arrange
        doNothing().when(usuarioRepositorio).deleteById(1L);

        // Act & Assert
        mockMvc.perform(delete("/api/usuarios/1"))
                .andExpect(status().isOk());

        verify(usuarioRepositorio, times(1)).deleteById(1L);
    }
} 