package com.harvesthub.repository;

import com.harvesthub.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByFieldId(Long fieldId);
    List<Expense> findByFieldUserId(Long userId);
}
