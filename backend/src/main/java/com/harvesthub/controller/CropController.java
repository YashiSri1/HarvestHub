package com.harvesthub.controller;

import com.harvesthub.model.Crop;
import com.harvesthub.services.CropService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }

    @PostMapping
    public ResponseEntity<Crop> addCrop(@RequestBody Crop crop) {
        return ResponseEntity.ok(cropService.addCrop(crop));
    }

    @GetMapping
    public ResponseEntity<List<Crop>> getAllCrops(@RequestParam(required = false) String season) {
        return ResponseEntity.ok(cropService.getAllCrops(season));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Crop> getCropById(@PathVariable Long id) {
        return ResponseEntity.ok(cropService.getCropById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Crop> updateCrop(@PathVariable Long id, @RequestBody Crop crop) {
        return ResponseEntity.ok(cropService.updateCrop(id, crop));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
        return ResponseEntity.ok().build();
    }
}
