package com.harvesthub.repository;

import com.harvesthub.model.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
    List<Field> findByUserId(Long userId);
    Optional<Field> findByIdAndUserId(Long id, Long userId);
}
