package com.harvesthub.services;

import com.harvesthub.model.Crop;
import com.harvesthub.repository.CropRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropService {

    private final CropRepository cropRepository;

    public CropService(CropRepository cropRepository) {
        this.cropRepository = cropRepository;
    }

    public Crop addCrop(Crop crop) {
        return cropRepository.save(crop);
    }

    public List<Crop> getAllCrops(String season) {
        if (season != null && !season.trim().isEmpty()) {
            return cropRepository.findBySeason(season);
        }
        return cropRepository.findAll();
    }

    public Crop getCropById(Long id) {
        return cropRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crop not found"));
    }

    public Crop updateCrop(Long id, Crop updatedCrop) {
        Crop existingCrop = getCropById(id);
        
        existingCrop.setCropName(updatedCrop.getCropName());
        existingCrop.setCropType(updatedCrop.getCropType());
        existingCrop.setSeason(updatedCrop.getSeason());
        existingCrop.setDurationDays(updatedCrop.getDurationDays());
        
        return cropRepository.save(existingCrop);
    }

    public void deleteCrop(Long id) {
        cropRepository.deleteById(id);
    }
}
