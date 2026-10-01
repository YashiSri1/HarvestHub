package com.harvesthub.repository;

import com.harvesthub.model.CropYield;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropYieldRepository extends JpaRepository<CropYield, Long> {
    List<CropYield> findByFieldUserId(Long userId);
}
