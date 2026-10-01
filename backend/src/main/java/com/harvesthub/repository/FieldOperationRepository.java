package com.harvesthub.repository;

import com.harvesthub.model.FieldOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldOperationRepository extends JpaRepository<FieldOperation, Long> {
    List<FieldOperation> findByFieldId(Long fieldId);
}
