package com.harvesthub.services;

import com.harvesthub.model.Equipment;
import com.harvesthub.model.User;
import com.harvesthub.repository.EquipmentRepository;
import com.harvesthub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final UserRepository userRepository;

    public EquipmentService(EquipmentRepository equipmentRepository, UserRepository userRepository) {
        this.equipmentRepository = equipmentRepository;
        this.userRepository = userRepository;
    }

    public Equipment addEquipment(Equipment equipment, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        equipment.setUser(user);
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipment(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return equipmentRepository.findByUserId(user.getId());
    }

    public Equipment getEquipmentById(Long id, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return equipmentRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Equipment not found"));
    }

    public Equipment updateEquipment(Long id, Equipment updatedEq, String userEmail) {
        Equipment eq = getEquipmentById(id, userEmail);
        eq.setName(updatedEq.getName());
        eq.setType(updatedEq.getType());
        eq.setPurchaseDate(updatedEq.getPurchaseDate());
        eq.setStatus(updatedEq.getStatus());
        return equipmentRepository.save(eq);
    }

    public void deleteEquipment(Long id, String userEmail) {
        Equipment eq = getEquipmentById(id, userEmail);
        equipmentRepository.delete(eq);
    }
}
