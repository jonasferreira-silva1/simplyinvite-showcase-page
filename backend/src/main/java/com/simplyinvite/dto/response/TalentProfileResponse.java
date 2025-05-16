package com.simplyinvite.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TalentProfileResponse {
    private UUID id;
    private UUID userId;
    private String email;
    private String fullName;
    private String interestArea;
    private String portfolioLink;
    private Integer age;
    private String city;
    private String institution;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 