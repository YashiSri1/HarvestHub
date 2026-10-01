package com.harvesthub.services;

import com.harvesthub.model.Crop;
import com.harvesthub.model.CropPlan;
import com.harvesthub.repository.CropPlanRepository;
import com.harvesthub.repository.CropRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CropRotationService {
    
    private final CropPlanRepository cropPlanRepository;
    private final CropRepository cropRepository;

    public CropRotationService(CropPlanRepository cropPlanRepository, CropRepository cropRepository) {
        this.cropPlanRepository = cropPlanRepository;
        this.cropRepository = cropRepository;
    }

    public Map<String, Object> getRotationRecommendation(Long fieldId) {
        CropPlan lastPlan = cropPlanRepository.findFirstByFieldIdOrderBySowingDateDesc(fieldId).orElse(null);
        
        Map<String, Object> result = new HashMap<>();
        
        if (lastPlan == null) {
            result.put("previousCrop", "None");
            result.put("recommendedCrops", cropRepository.findAll());
            result.put("reason", "No previous crop history. You can plant any suitable crop.");
            return result;
        }

        Crop lastCrop = lastPlan.getCrop();
        result.put("previousCrop", lastCrop.getCropName());
        
        List<Crop> allCrops = cropRepository.findAll();
        List<Crop> recommended = allCrops.stream()
                .filter(c -> c.getCropType() != null && !c.getCropType().equalsIgnoreCase(lastCrop.getCropType()))
                .collect(Collectors.toList());
                
        if (recommended.isEmpty()) {
            recommended = allCrops;
        }
                
        result.put("recommendedCrops", recommended);
        result.put("reason", "The recommended crops provide crop rotation diversity by changing the crop family/type.");
        
        return result;
    }
}
