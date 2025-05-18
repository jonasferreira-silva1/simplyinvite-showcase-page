package com.simplyinvite_showcase_page.backend.controladores;

import com.simplyinvite_showcase_page.backend.modelos.Usuario;
import com.simplyinvite_showcase_page.backend.repositorios.UsuarioRepositorio;
import com.simplyinvite_showcase_page.backend.seguranca.JwtUtil;
import com.simplyinvite_showcase_page.backend.dtos.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthControlador {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Usuario user = usuarioRepositorio.findByEmail(loginRequest.getEmail());
        if (user != null && passwordEncoder.matches(loginRequest.getSenha(), user.getSenha())) {
            String token = JwtUtil.gerarToken(user.getEmail(), user.getTipoPerfil());
            return ResponseEntity.ok(new java.util.HashMap<String, Object>() {{
                put("token", token);
                put("tipoPerfil", user.getTipoPerfil());
                put("usuario", user);
            }});
        } else {
            return ResponseEntity.status(401).body(new java.util.HashMap<String, Object>() {{
                put("mensagem", "Credenciais inválidas");
            }});
        }
    }
}
