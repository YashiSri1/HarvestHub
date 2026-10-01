package com.harvesthub.services;

import com.harvesthub.model.Crop;
import com.harvesthub.model.CropPlan;
import com.harvesthub.model.Field;
import com.harvesthub.repository.CropPlanRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CropPlanService {

    private final CropPlanRepository cropPlanRepository;
    private final FieldService fieldService;
    private final CropService cropService;

    public CropPlanService(CropPlanRepository cropPlanRepository, FieldService fieldService, CropService cropService) {
        this.cropPlanRepository = cropPlanRepository;
        this.fieldService = fieldService;
        this.cropService = cropService;
    }

    public CropPlan addCropPlan(Long fieldId, Long cropId, LocalDate sowingDate, String notes, String userEmail) {
        Field field = fieldService.getFieldById(fieldId, userEmail);
        Crop crop = cropService.getCropById(cropId);
        
        CropPlan plan = new CropPlan();
        plan.setField(field);
        plan.setCrop(crop);
        plan.setSowingDate(sowingDate);
        plan.setNotes(notes);
        plan.setStatus("PLANNED");
        
        if(sowingDate != null && crop.getDurationDays() != null) {
            plan.setExpectedHarvestDate(sowingDate.plusDays(crop.getDurationDays()));
        }

        return cropPlanRepository.save(plan);
    }

    public List<CropPlan> getAllCropPlans(String userEmail) {
        List<Field> fields = fieldService.getAllFieldsByUser(userEmail);
        if (fields.isEmpty()) return new ArrayList<>();
        return cropPlanRepository.findByFieldUserId(fields.get(0).getUser().getId());
    }

    public CropPlan getCropPlanById(Long id) {
        return cropPlanRepository.findById(id).orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    public CropPlan updateCropPlanStatus(Long id, String status) {
        CropPlan plan = getCropPlanById(id);
        plan.setStatus(status);
        return cropPlanRepository.save(plan);
    }

    public void deleteCropPlan(Long id) {
        cropPlanRepository.deleteById(id);
    }
}
