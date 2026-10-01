package com.harvesthub.controller;

import com.harvesthub.model.FieldOperation;
import com.harvesthub.services.FieldOperationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations")
public class FieldOperationController {

    private final FieldOperationService fieldOperationService;

    public FieldOperationController(FieldOperationService fieldOperationService) {
        this.fieldOperationService = fieldOperationService;
    }

    @PostMapping
    public ResponseEntity<FieldOperation> addOperation(@RequestParam Long fieldId, @RequestBody FieldOperation operation, Authentication authentication) {
        return ResponseEntity.ok(fieldOperationService.addOperation(fieldId, operation, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<FieldOperation>> getOperationsByField(@RequestParam Long fieldId, Authentication authentication) {
        return ResponseEntity.ok(fieldOperationService.getOperationsByField(fieldId, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FieldOperation> updateOperation(@PathVariable Long id, @RequestBody FieldOperation operation) {
        return ResponseEntity.ok(fieldOperationService.updateOperation(id, operation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOperation(@PathVariable Long id) {
        fieldOperationService.deleteOperation(id);
        return ResponseEntity.ok().build();
    }
}
