package com.harvesthub.controller;

import com.harvesthub.model.CropYield;
import com.harvesthub.services.CropYieldService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/yields")
public class CropYieldController {

    private final CropYieldService cropYieldService;

    public CropYieldController(CropYieldService cropYieldService) {
        this.cropYieldService = cropYieldService;
    }

    @PostMapping
    public ResponseEntity<CropYield> addYield(@RequestParam Long fieldId, @RequestParam Long cropId, @RequestBody CropYield yield, Authentication authentication) {
        return ResponseEntity.ok(cropYieldService.addYield(fieldId, cropId, yield, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<CropYield>> getAllYields(Authentication authentication) {
        return ResponseEntity.ok(cropYieldService.getAllYields(authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CropYield> updateYield(@PathVariable Long id, @RequestBody CropYield yield) {
        return ResponseEntity.ok(cropYieldService.updateYield(id, yield));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteYield(@PathVariable Long id) {
        cropYieldService.deleteYield(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<List<Map<String, Object>>> getYieldSummary(Authentication authentication) {
        return ResponseEntity.ok(cropYieldService.getYieldSummary(authentication.getName()));
    }
}
