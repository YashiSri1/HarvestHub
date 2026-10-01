package com.harvesthub.services;

import com.harvesthub.model.CropPlan;
import com.harvesthub.model.CropYield;
import com.harvesthub.model.Expense;
import com.harvesthub.repository.CropPlanRepository;
import com.harvesthub.repository.CropYieldRepository;
import com.harvesthub.repository.ExpenseRepository;
import com.harvesthub.repository.FieldRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final FieldService fieldService;
    private final CropPlanService cropPlanService;
    private final ExpenseService expenseService;
    private final CropYieldService cropYieldService;
    private final FieldOperationService fieldOperationService;
    private final MaintenanceService maintenanceService;

    public DashboardService(FieldService fieldService, CropPlanService cropPlanService,
                            ExpenseService expenseService, CropYieldService cropYieldService,
                            FieldOperationService fieldOperationService, MaintenanceService maintenanceService) {
        this.fieldService = fieldService;
        this.cropPlanService = cropPlanService;
        this.expenseService = expenseService;
        this.cropYieldService = cropYieldService;
        this.fieldOperationService = fieldOperationService;
        this.maintenanceService = maintenanceService;
    }

    public Map<String, Object> getDashboardStats(String userEmail) {
        Map<String, Object> stats = new HashMap<>();
        
        int totalFields = fieldService.getAllFieldsByUser(userEmail).size();
        stats.put("totalFields", totalFields);
        
        List<CropPlan> plans = cropPlanService.getAllCropPlans(userEmail);
        long activeCrops = plans.stream().filter(p -> "ACTIVE".equalsIgnoreCase(p.getStatus())).count();
        long plannedCrops = plans.stream().filter(p -> "PLANNED".equalsIgnoreCase(p.getStatus())).count();
        stats.put("activeCrops", activeCrops);
        stats.put("plannedCrops", plannedCrops);
        
        Map<String, Double> expenseSummary = expenseService.getExpenseSummary(userEmail);
        stats.put("totalExpenses", expenseSummary.getOrDefault("totalExpenses", 0.0));
        
        List<Map<String, Object>> yields = cropYieldService.getYieldSummary(userEmail);
        double totalExpectedYield = yields.stream().mapToDouble(y -> (double) y.get("expected")).sum();
        double totalActualYield = yields.stream().mapToDouble(y -> (double) y.get("actual")).sum();
        stats.put("totalExpectedYield", totalExpectedYield);
        stats.put("totalActualYield", totalActualYield);
        
        int upcomingMaintenance = maintenanceService.getUpcoming(userEmail).size();
        int overdueMaintenance = maintenanceService.getOverdue(userEmail).size();
        stats.put("upcomingMaintenance", upcomingMaintenance);
        stats.put("overdueMaintenance", overdueMaintenance);
        
        return stats;
    }
}
