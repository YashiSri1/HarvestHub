package com.harvesthub.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id", nullable = false)
    @JsonIgnore
    private Field field;

    private String category;
    private Double amount;
    private LocalDate expenseDate;
    private String description;

    public Expense() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Field getField() { return field; }
    public void setField(Field field) { this.field = field; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    
    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
