package com.harvesthub.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "crop_plans")
public class CropPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "field_id", nullable = false)
    private Field field;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    private LocalDate sowingDate;
    private LocalDate expectedHarvestDate;
    private String status;
    private String notes;

    public CropPlan() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Field getField() { return field; }
    public void setField(Field field) { this.field = field; }
    
    public Crop getCrop() { return crop; }
    public void setCrop(Crop crop) { this.crop = crop; }
    
    public LocalDate getSowingDate() { return sowingDate; }
    public void setSowingDate(LocalDate sowingDate) { this.sowingDate = sowingDate; }
    
    public LocalDate getExpectedHarvestDate() { return expectedHarvestDate; }
    public void setExpectedHarvestDate(LocalDate expectedHarvestDate) { this.expectedHarvestDate = expectedHarvestDate; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
