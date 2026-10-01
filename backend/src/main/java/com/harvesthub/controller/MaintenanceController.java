package com.harvesthub.controller;

import com.harvesthub.model.Maintenance;
import com.harvesthub.services.MaintenanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @PostMapping
    public ResponseEntity<Maintenance> addMaintenance(@RequestParam Long equipmentId, @RequestBody Maintenance maintenance, Authentication authentication) {
        return ResponseEntity.ok(maintenanceService.addMaintenance(equipmentId, maintenance, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Maintenance>> getAllMaintenance(Authentication authentication) {
        return ResponseEntity.ok(maintenanceService.getAllMaintenance(authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Maintenance> updateMaintenance(@PathVariable Long id, @RequestBody Maintenance maintenance) {
        return ResponseEntity.ok(maintenanceService.updateMaintenance(id, maintenance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenance(@PathVariable Long id) {
        maintenanceService.deleteMaintenance(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Maintenance>> getUpcoming(Authentication authentication) {
        return ResponseEntity.ok(maintenanceService.getUpcoming(authentication.getName()));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<Maintenance>> getOverdue(Authentication authentication) {
        return ResponseEntity.ok(maintenanceService.getOverdue(authentication.getName()));
    }
}
