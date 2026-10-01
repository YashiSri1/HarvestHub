package com.harvesthub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "crop_yields")
public class CropYield {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id", nullable = false)
    @JsonIgnore
    private Field field;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    @JsonIgnore
    private Crop crop;

    private Double expectedQuantity;
    private Double actualQuantity;
    private String unit;
    private LocalDate harvestDate;

    public CropYield() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Field getField() { return field; }
    public void setField(Field field) { this.field = field; }
    
    public Crop getCrop() { return crop; }
    public void setCrop(Crop crop) { this.crop = crop; }
    
    public Double getExpectedQuantity() { return expectedQuantity; }
    public void setExpectedQuantity(Double expectedQuantity) { this.expectedQuantity = expectedQuantity; }
    
    public Double getActualQuantity() { return actualQuantity; }
    public void setActualQuantity(Double actualQuantity) { this.actualQuantity = actualQuantity; }
    
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    
    public LocalDate getHarvestDate() { return harvestDate; }
    public void setHarvestDate(LocalDate harvestDate) { this.harvestDate = harvestDate; }
}
