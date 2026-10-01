package com.harvesthub.controller;

import com.harvesthub.model.Equipment;
import com.harvesthub.services.EquipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    @PostMapping
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment, Authentication authentication) {
        return ResponseEntity.ok(equipmentService.addEquipment(equipment, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipment(Authentication authentication) {
        return ResponseEntity.ok(equipmentService.getAllEquipment(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(equipmentService.getEquipmentById(id, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipment, Authentication authentication) {
        return ResponseEntity.ok(equipmentService.updateEquipment(id, equipment, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id, Authentication authentication) {
        equipmentService.deleteEquipment(id, authentication.getName());
        return ResponseEntity.ok().build();
    }
}
