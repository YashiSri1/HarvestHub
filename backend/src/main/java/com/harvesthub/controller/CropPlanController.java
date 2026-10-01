package com.harvesthub.controller;

import com.harvesthub.model.CropPlan;
import com.harvesthub.services.CropPlanService;
import com.harvesthub.services.CropRotationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/crop-plans")
public class CropPlanController {

    private final CropPlanService cropPlanService;
    private final CropRotationService cropRotationService;

    public CropPlanController(CropPlanService cropPlanService, CropRotationService cropRotationService) {
        this.cropPlanService = cropPlanService;
        this.cropRotationService = cropRotationService;
    }

    @PostMapping
    public ResponseEntity<CropPlan> addCropPlan(@RequestBody Map<String, String> request, Authentication authentication) {
        Long fieldId = Long.parseLong(request.get("fieldId"));
        Long cropId = Long.parseLong(request.get("cropId"));
        LocalDate sowingDate = LocalDate.parse(request.get("sowingDate"));
        String notes = request.get("notes");
        return ResponseEntity.ok(cropPlanService.addCropPlan(fieldId, cropId, sowingDate, notes, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<CropPlan>> getAllCropPlans(Authentication authentication) {
        return ResponseEntity.ok(cropPlanService.getAllCropPlans(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CropPlan> getCropPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(cropPlanService.getCropPlanById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CropPlan> updateCropPlan(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(cropPlanService.updateCropPlanStatus(id, request.get("status")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCropPlan(@PathVariable Long id) {
        cropPlanService.deleteCropPlan(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/rotation/{fieldId}")
    public ResponseEntity<Map<String, Object>> getRotationRecommendation(@PathVariable Long fieldId) {
        return ResponseEntity.ok(cropRotationService.getRotationRecommendation(fieldId));
    }
}
