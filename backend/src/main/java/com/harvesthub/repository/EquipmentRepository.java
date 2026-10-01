package com.harvesthub.repository;

import com.harvesthub.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByUserId(Long userId);
    Optional<Equipment> findByIdAndUserId(Long id, Long userId);
}
