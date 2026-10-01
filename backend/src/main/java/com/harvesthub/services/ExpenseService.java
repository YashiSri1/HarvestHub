package com.harvesthub.services;

import com.harvesthub.model.Expense;
import com.harvesthub.model.Field;
import com.harvesthub.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final FieldService fieldService;

    public ExpenseService(ExpenseRepository expenseRepository, FieldService fieldService) {
        this.expenseRepository = expenseRepository;
        this.fieldService = fieldService;
    }

    public Expense addExpense(Long fieldId, Expense expense, String userEmail) {
        expense.setField(fieldService.getFieldById(fieldId, userEmail));
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses(String userEmail) {
        List<Field> fields = fieldService.getAllFieldsByUser(userEmail);
        if (fields.isEmpty()) return new ArrayList<>();
        return expenseRepository.findByFieldUserId(fields.get(0).getUser().getId());
    }

    public Expense updateExpense(Long id, Expense updatedExp) {
        Expense exp = expenseRepository.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));
        exp.setCategory(updatedExp.getCategory());
        exp.setAmount(updatedExp.getAmount());
        exp.setExpenseDate(updatedExp.getExpenseDate());
        exp.setDescription(updatedExp.getDescription());
        return expenseRepository.save(exp);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public Map<String, Double> getExpenseSummary(String userEmail) {
        List<Expense> expenses = getAllExpenses(userEmail);
        double total = expenses.stream().mapToDouble(Expense::getAmount).sum();
        Map<String, Double> summary = new HashMap<>();
        summary.put("totalExpenses", total);
        return summary;
    }
}
