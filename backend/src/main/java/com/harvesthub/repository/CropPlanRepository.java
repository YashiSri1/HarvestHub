package com.harvesthub.repository;

import com.harvesthub.model.CropPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CropPlanRepository extends JpaRepository<CropPlan, Long> {
    List<CropPlan> findByFieldUserId(Long userId);
    List<CropPlan> findByFieldId(Long fieldId);
    Optional<CropPlan> findFirstByFieldIdOrderBySowingDateDesc(Long fieldId);
}
