package com.harvesthub.controller;

import com.harvesthub.model.Field;
import com.harvesthub.services.FieldService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fields")
public class FieldController {

    private final FieldService fieldService;

    public FieldController(FieldService fieldService) {
        this.fieldService = fieldService;
    }

    @PostMapping
    public ResponseEntity<Field> addField(@RequestBody Field field, Authentication authentication) {
        return ResponseEntity.ok(fieldService.addField(field, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Field>> getAllFields(Authentication authentication) {
        return ResponseEntity.ok(fieldService.getAllFieldsByUser(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Field> getFieldById(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(fieldService.getFieldById(id, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Field> updateField(@PathVariable Long id, @RequestBody Field field, Authentication authentication) {
        return ResponseEntity.ok(fieldService.updateField(id, field, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteField(@PathVariable Long id, Authentication authentication) {
        fieldService.deleteField(id, authentication.getName());
        return ResponseEntity.ok().build();
    }
}
