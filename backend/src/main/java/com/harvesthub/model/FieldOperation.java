package com.harvesthub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "field_operations")
public class FieldOperation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id", nullable = false)
    @JsonIgnore
    private Field field;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_plan_id")
    @JsonIgnore
    private CropPlan cropPlan;

    private String operationType;
    private LocalDate operationDate;
    private Double cost;
    private String notes;
    private String status;

    public FieldOperation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Field getField() { return field; }
    public void setField(Field field) { this.field = field; }
    
    public CropPlan getCropPlan() { return cropPlan; }
    public void setCropPlan(CropPlan cropPlan) { this.cropPlan = cropPlan; }
    
    public String getOperationType() { return operationType; }
    public void setOperationType(String operationType) { this.operationType = operationType; }
    
    public LocalDate getOperationDate() { return operationDate; }
    public void setOperationDate(LocalDate operationDate) { this.operationDate = operationDate; }
    
    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
