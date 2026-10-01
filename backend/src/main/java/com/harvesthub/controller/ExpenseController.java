package com.harvesthub.controller;

import com.harvesthub.model.Expense;
import com.harvesthub.services.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestParam Long fieldId, @RequestBody Expense expense, Authentication authentication) {
        return ResponseEntity.ok(expenseService.addExpense(fieldId, expense, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(Authentication authentication) {
        return ResponseEntity.ok(expenseService.getAllExpenses(authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Double>> getExpenseSummary(Authentication authentication) {
        return ResponseEntity.ok(expenseService.getExpenseSummary(authentication.getName()));
    }
}
