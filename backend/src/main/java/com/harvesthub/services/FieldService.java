package com.harvesthub.services;

import com.harvesthub.model.Field;
import com.harvesthub.model.User;
import com.harvesthub.repository.FieldRepository;
import com.harvesthub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService {

    private final FieldRepository fieldRepository;
    private final UserRepository userRepository;

    public FieldService(FieldRepository fieldRepository, UserRepository userRepository) {
        this.fieldRepository = fieldRepository;
        this.userRepository = userRepository;
    }

    public Field addField(Field field, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        field.setUser(user);
        return fieldRepository.save(field);
    }

    public List<Field> getAllFieldsByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return fieldRepository.findByUserId(user.getId());
    }

    public Field getFieldById(Long id, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return fieldRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Field not found or access denied"));
    }

    public Field updateField(Long id, Field updatedField, String userEmail) {
        Field existingField = getFieldById(id, userEmail);
        
        existingField.setFieldName(updatedField.getFieldName());
        existingField.setArea(updatedField.getArea());
        existingField.setSoilType(updatedField.getSoilType());
        existingField.setLocation(updatedField.getLocation());
        existingField.setIrrigationType(updatedField.getIrrigationType());
        
        return fieldRepository.save(existingField);
    }

    public void deleteField(Long id, String userEmail) {
        Field existingField = getFieldById(id, userEmail);
        fieldRepository.delete(existingField);
    }
}
