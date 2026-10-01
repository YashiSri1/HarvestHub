package com.harvesthub.services;

import com.harvesthub.model.Equipment;
import com.harvesthub.model.Maintenance;
import com.harvesthub.model.User;
import com.harvesthub.repository.MaintenanceRepository;
import com.harvesthub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final EquipmentService equipmentService;
    private final UserRepository userRepository;

    public MaintenanceService(MaintenanceRepository maintenanceRepository, EquipmentService equipmentService, UserRepository userRepository) {
        this.maintenanceRepository = maintenanceRepository;
        this.equipmentService = equipmentService;
        this.userRepository = userRepository;
    }

    public Maintenance addMaintenance(Long equipmentId, Maintenance maintenance, String userEmail) {
        Equipment eq = equipmentService.getEquipmentById(equipmentId, userEmail);
        maintenance.setEquipment(eq);
        return maintenanceRepository.save(maintenance);
    }

    public List<Maintenance> getAllMaintenance(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return maintenanceRepository.findByEquipmentUserId(user.getId());
    }

    public Maintenance updateMaintenance(Long id, Maintenance updatedMaint) {
        Maintenance maint = maintenanceRepository.findById(id).orElseThrow(() -> new RuntimeException("Maintenance not found"));
        maint.setMaintenanceDate(updatedMaint.getMaintenanceDate());
        maint.setNextDueDate(updatedMaint.getNextDueDate());
        maint.setCost(updatedMaint.getCost());
        maint.setDescription(updatedMaint.getDescription());
        maint.setStatus(updatedMaint.getStatus());
        return maintenanceRepository.save(maint);
    }

    public void deleteMaintenance(Long id) {
        maintenanceRepository.deleteById(id);
    }

    public List<Maintenance> getUpcoming(String userEmail) {
        return getAllMaintenance(userEmail).stream()
                .filter(m -> m.getNextDueDate() != null && m.getNextDueDate().isAfter(LocalDate.now()))
                .collect(Collectors.toList());
    }

    public List<Maintenance> getOverdue(String userEmail) {
        return getAllMaintenance(userEmail).stream()
                .filter(m -> m.getNextDueDate() != null && m.getNextDueDate().isBefore(LocalDate.now()) && !"COMPLETED".equalsIgnoreCase(m.getStatus()))
                .collect(Collectors.toList());
    }
}
