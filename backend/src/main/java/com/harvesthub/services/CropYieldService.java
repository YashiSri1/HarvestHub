package com.harvesthub.services;

import com.harvesthub.model.CropYield;
import com.harvesthub.model.Field;
import com.harvesthub.repository.CropYieldRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CropYieldService {

    private final CropYieldRepository cropYieldRepository;
    private final FieldService fieldService;
    private final CropService cropService;

    public CropYieldService(CropYieldRepository cropYieldRepository, FieldService fieldService, CropService cropService) {
        this.cropYieldRepository = cropYieldRepository;
        this.fieldService = fieldService;
        this.cropService = cropService;
    }

    public CropYield addYield(Long fieldId, Long cropId, CropYield yield, String userEmail) {
        yield.setField(fieldService.getFieldById(fieldId, userEmail));
        yield.setCrop(cropService.getCropById(cropId));
        return cropYieldRepository.save(yield);
    }

    public List<CropYield> getAllYields(String userEmail) {
        List<Field> fields = fieldService.getAllFieldsByUser(userEmail);
        if (fields.isEmpty()) return new ArrayList<>();
        return cropYieldRepository.findByFieldUserId(fields.get(0).getUser().getId());
    }

    public CropYield updateYield(Long id, CropYield updatedYield) {
        CropYield yield = cropYieldRepository.findById(id).orElseThrow(() -> new RuntimeException("Yield not found"));
        yield.setExpectedQuantity(updatedYield.getExpectedQuantity());
        yield.setActualQuantity(updatedYield.getActualQuantity());
        yield.setUnit(updatedYield.getUnit());
        yield.setHarvestDate(updatedYield.getHarvestDate());
        return cropYieldRepository.save(yield);
    }

    public void deleteYield(Long id) {
        cropYieldRepository.deleteById(id);
    }

    public List<Map<String, Object>> getYieldSummary(String userEmail) {
        List<CropYield> yields = getAllYields(userEmail);
        List<Map<String, Object>> summaryList = new ArrayList<>();
        for (CropYield cy : yields) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", cy.getId());
            map.put("cropName", cy.getCrop().getCropName());
            map.put("expected", cy.getExpectedQuantity());
            map.put("actual", cy.getActualQuantity());
            double diff = cy.getActualQuantity() - cy.getExpectedQuantity();
            map.put("difference", diff);
            double pct = 0;
            if (cy.getExpectedQuantity() > 0) {
                pct = (cy.getActualQuantity() / cy.getExpectedQuantity()) * 100;
            }
            map.put("percentageAchievement", pct);
            summaryList.add(map);
        }
        return summaryList;
    }
}
