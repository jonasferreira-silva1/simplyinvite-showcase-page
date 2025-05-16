package com.simplyinvite.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ManagerProfileResponse {
    private UUID id;
    private UUID userId;
    private String email;
    private String fullName;
    private String company;
    private String position;
    private String talentSearchArea;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 