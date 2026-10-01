package com.harvesthub.services;

import com.harvesthub.model.FieldOperation;
import com.harvesthub.repository.FieldOperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldOperationService {
    
    private final FieldOperationRepository fieldOperationRepository;
    private final FieldService fieldService;

    public FieldOperationService(FieldOperationRepository fieldOperationRepository, FieldService fieldService) {
        this.fieldOperationRepository = fieldOperationRepository;
        this.fieldService = fieldService;
    }

    public FieldOperation addOperation(Long fieldId, FieldOperation operation, String userEmail) {
        operation.setField(fieldService.getFieldById(fieldId, userEmail));
        return fieldOperationRepository.save(operation);
    }

    public List<FieldOperation> getOperationsByField(Long fieldId, String userEmail) {
        fieldService.getFieldById(fieldId, userEmail);
        return fieldOperationRepository.findByFieldId(fieldId);
    }

    public FieldOperation updateOperation(Long id, FieldOperation updatedOp) {
        FieldOperation op = fieldOperationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operation not found"));
        op.setOperationType(updatedOp.getOperationType());
        op.setOperationDate(updatedOp.getOperationDate());
        op.setCost(updatedOp.getCost());
        op.setNotes(updatedOp.getNotes());
        op.setStatus(updatedOp.getStatus());
        return fieldOperationRepository.save(op);
    }

    public void deleteOperation(Long id) {
        fieldOperationRepository.deleteById(id);
    }
}
