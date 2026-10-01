package com.harvesthub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "crops")
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cropName;
    
    private String cropType;
    private String season;
    private Integer durationDays;

    public Crop() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    
    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }
    
    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
    
    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }
}
