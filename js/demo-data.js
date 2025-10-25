// Demo Data for Role Mining Application
const DemoData = {
    // SuccessFactors HR Data
    hrData: [
        { employeeId: '50048221', name: 'Jan de Vries', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048222', name: 'Marie Jansen', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048223', name: 'Peter Bakker', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048224', name: 'Lisa de Jong', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048225', name: 'Tom Visser', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048226', name: 'Emma Smit', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048227', name: 'Lars Hendriks', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048228', name: 'Sophie van Dam', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048229', name: 'Mark Peters', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },
        { employeeId: '50048230', name: 'Nina Vermeulen', department: 'Waterexpertise DWI', function: 'Controleur Drinkwaterinstall', team: 'DWI', location: 'Zwolle' },

        { employeeId: '50048301', name: 'Pieter Groot', department: 'Productie', function: 'Procesoperator', team: 'Productie A', location: 'Zwolle' },
        { employeeId: '50048302', name: 'Anna de Wit', department: 'Productie', function: 'Procesoperator', team: 'Productie A', location: 'Zwolle' },
        { employeeId: '50048303', name: 'Johan Mulder', department: 'Productie', function: 'Procesoperator', team: 'Productie A', location: 'Zwolle' },
        { employeeId: '50048304', name: 'Sara Dekker', department: 'Productie', function: 'Procesoperator', team: 'Productie B', location: 'Zwolle' },
        { employeeId: '50048305', name: 'Frank Bosch', department: 'Productie', function: 'Procesoperator', team: 'Productie B', location: 'Zwolle' },
        { employeeId: '50048306', name: 'Linda van Dijk', department: 'Productie', function: 'Procesoperator', team: 'Productie B', location: 'Zwolle' },
        { employeeId: '50048307', name: 'Rob Meijer', department: 'Productie', function: 'Procesoperator', team: 'Productie C', location: 'Zwolle' },
        { employeeId: '50048308', name: 'Karin Hoek', department: 'Productie', function: 'Procesoperator', team: 'Productie C', location: 'Zwolle' },

        { employeeId: '50048401', name: 'David Berg', department: 'Onderhoud', function: 'Technisch Specialist', team: 'Onderhoud', location: 'Zwolle' },
        { employeeId: '50048402', name: 'Eva Vos', department: 'Onderhoud', function: 'Technisch Specialist', team: 'Onderhoud', location: 'Zwolle' },
        { employeeId: '50048403', name: 'Bas Kok', department: 'Onderhoud', function: 'Technisch Specialist', team: 'Onderhoud', location: 'Zwolle' },
        { employeeId: '50048404', name: 'Julia Brink', department: 'Onderhoud', function: 'Technisch Specialist', team: 'Onderhoud', location: 'Zwolle' },

        { employeeId: '50048501', name: 'Martin Ruiter', department: 'Finance', function: 'Financial Controller', team: 'Finance', location: 'Zwolle' },
        { employeeId: '50048502', name: 'Claire Veen', department: 'Finance', function: 'Financial Controller', team: 'Finance', location: 'Zwolle' },
        { employeeId: '50048503', name: 'Henk Brouwer', department: 'Finance', function: 'Financial Controller', team: 'Finance', location: 'Zwolle' },

        { employeeId: '50048601', name: 'Sanne Post', department: 'HR', function: 'HR Business Partner', team: 'HR', location: 'Zwolle' },
        { employeeId: '50048602', name: 'Tim Mol', department: 'HR', function: 'HR Business Partner', team: 'HR', location: 'Zwolle' },
    ],

    // SAP GRC Access Control Roles
    grcRoles: [
        // Business Roles
        { roleId: 'BR-LAB_CONTROLEUR_DWI', roleName: 'Controleur Drinkwater Installatie', roleType: 'Business', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'BR-PROCESOPERATOR', roleName: 'Proces Operator', roleType: 'Business', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'BR-TECH_SPECIALIST', roleName: 'Technisch Specialist', roleType: 'Business', system: 'S/4', riskLevel: 'Medium' },
        { roleId: 'BR-FINANCE_CONTROLLER', roleName: 'Financial Controller', roleType: 'Business', system: 'S/4', riskLevel: 'High' },
        { roleId: 'BR-HR_PARTNER', roleName: 'HR Business Partner', roleType: 'Business', system: 'S/4', riskLevel: 'High' },

        // Technical Roles
        { roleId: 'SAP_BC_BASIS_ADMIN', roleName: 'SAP Basis Administrator', roleType: 'Technical', system: 'S/4', riskLevel: 'Critical' },
        { roleId: 'SAP_FI_DISPLAY', roleName: 'FI Display Only', roleType: 'Technical', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'SAP_MM_PURCHASER', roleName: 'MM Purchaser', roleType: 'Technical', system: 'S/4', riskLevel: 'Medium' },
        { roleId: 'SAP_PM_PLANNER', roleName: 'PM Maintenance Planner', roleType: 'Technical', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'SAP_PP_OPERATOR', roleName: 'PP Production Operator', roleType: 'Technical', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'SAP_QM_INSPECTOR', roleName: 'QM Quality Inspector', roleType: 'Technical', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'SAP_SD_CLERK', roleName: 'SD Sales Clerk', roleType: 'Technical', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'SAP_HR_EMPLOYEE', roleName: 'HR Employee Self Service', roleType: 'Technical', system: 'S/4', riskLevel: 'Low' },
        { roleId: 'SAP_HR_MANAGER', roleName: 'HR Manager', roleType: 'Technical', system: 'S/4', riskLevel: 'High' },
        { roleId: 'SAP_FI_ACCOUNTANT', roleName: 'FI Accountant', roleType: 'Technical', system: 'S/4', riskLevel: 'High' },
    ],

    // User Role Assignments (what users currently have)
    userRoleAssignments: [
        // Controleur Drinkwaterinstall - High saturation for certain roles
        { employeeId: '50048221', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-01-15', requestId: 'REQ-001' },
        { employeeId: '50048221', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-01-15', requestId: 'REQ-001' },
        { employeeId: '50048221', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-01-15', requestId: 'REQ-001' },

        { employeeId: '50048222', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-02-10', requestId: 'REQ-045' },
        { employeeId: '50048222', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-02-10', requestId: 'REQ-045' },
        { employeeId: '50048222', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-02-10', requestId: 'REQ-045' },

        { employeeId: '50048223', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-03-05', requestId: 'REQ-078' },
        { employeeId: '50048223', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-03-05', requestId: 'REQ-078' },
        { employeeId: '50048223', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-03-05', requestId: 'REQ-078' },
        { employeeId: '50048223', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-03-20', requestId: 'REQ-089' },

        { employeeId: '50048224', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-01-20', requestId: 'REQ-012' },
        { employeeId: '50048224', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-01-20', requestId: 'REQ-012' },
        { employeeId: '50048224', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-01-20', requestId: 'REQ-012' },

        { employeeId: '50048225', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-02-15', requestId: 'REQ-056' },
        { employeeId: '50048225', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-02-15', requestId: 'REQ-056' },

        { employeeId: '50048226', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-03-10', requestId: 'REQ-091' },
        { employeeId: '50048226', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-03-10', requestId: 'REQ-091' },
        { employeeId: '50048226', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-03-10', requestId: 'REQ-091' },

        { employeeId: '50048227', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-04-01', requestId: 'REQ-112' },
        { employeeId: '50048227', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-04-01', requestId: 'REQ-112' },
        { employeeId: '50048227', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-04-01', requestId: 'REQ-112' },

        { employeeId: '50048228', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-04-15', requestId: 'REQ-134' },
        { employeeId: '50048228', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-04-15', requestId: 'REQ-134' },
        { employeeId: '50048228', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-04-15', requestId: 'REQ-134' },
        { employeeId: '50048228', roleId: 'SAP_MM_PURCHASER', assignmentDate: '2024-05-01', requestId: 'REQ-145' },

        { employeeId: '50048229', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-05-10', requestId: 'REQ-167' },
        { employeeId: '50048229', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-05-10', requestId: 'REQ-167' },

        { employeeId: '50048230', roleId: 'SAP_QM_INSPECTOR', assignmentDate: '2024-06-01', requestId: 'REQ-189' },
        { employeeId: '50048230', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-06-01', requestId: 'REQ-189' },
        { employeeId: '50048230', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-06-01', requestId: 'REQ-189' },

        // Procesoperator
        { employeeId: '50048301', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-01-10', requestId: 'REQ-005' },
        { employeeId: '50048301', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-01-10', requestId: 'REQ-005' },
        { employeeId: '50048301', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-01-10', requestId: 'REQ-005' },

        { employeeId: '50048302', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-02-05', requestId: 'REQ-034' },
        { employeeId: '50048302', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-02-05', requestId: 'REQ-034' },
        { employeeId: '50048302', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-02-05', requestId: 'REQ-034' },

        { employeeId: '50048303', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-03-01', requestId: 'REQ-067' },
        { employeeId: '50048303', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-03-01', requestId: 'REQ-067' },

        { employeeId: '50048304', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-03-15', requestId: 'REQ-089' },
        { employeeId: '50048304', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-03-15', requestId: 'REQ-089' },
        { employeeId: '50048304', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-03-15', requestId: 'REQ-089' },

        { employeeId: '50048305', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-04-01', requestId: 'REQ-101' },
        { employeeId: '50048305', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-04-01', requestId: 'REQ-101' },
        { employeeId: '50048305', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-04-01', requestId: 'REQ-101' },

        { employeeId: '50048306', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-04-20', requestId: 'REQ-123' },
        { employeeId: '50048306', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-04-20', requestId: 'REQ-123' },
        { employeeId: '50048306', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-04-20', requestId: 'REQ-123' },

        { employeeId: '50048307', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-05-05', requestId: 'REQ-145' },
        { employeeId: '50048307', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-05-05', requestId: 'REQ-145' },
        { employeeId: '50048307', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-05-05', requestId: 'REQ-145' },

        { employeeId: '50048308', roleId: 'SAP_PP_OPERATOR', assignmentDate: '2024-06-01', requestId: 'REQ-178' },
        { employeeId: '50048308', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-06-01', requestId: 'REQ-178' },

        // Technisch Specialist
        { employeeId: '50048401', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-01-15', requestId: 'REQ-008' },
        { employeeId: '50048401', roleId: 'SAP_MM_PURCHASER', assignmentDate: '2024-01-15', requestId: 'REQ-008' },
        { employeeId: '50048401', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-01-15', requestId: 'REQ-008' },

        { employeeId: '50048402', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-02-10', requestId: 'REQ-045' },
        { employeeId: '50048402', roleId: 'SAP_MM_PURCHASER', assignmentDate: '2024-02-10', requestId: 'REQ-045' },
        { employeeId: '50048402', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-02-10', requestId: 'REQ-045' },

        { employeeId: '50048403', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-03-05', requestId: 'REQ-078' },
        { employeeId: '50048403', roleId: 'SAP_MM_PURCHASER', assignmentDate: '2024-03-05', requestId: 'REQ-078' },
        { employeeId: '50048403', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-03-05', requestId: 'REQ-078' },

        { employeeId: '50048404', roleId: 'SAP_PM_PLANNER', assignmentDate: '2024-04-01', requestId: 'REQ-112' },
        { employeeId: '50048404', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-04-01', requestId: 'REQ-112' },

        // Financial Controller
        { employeeId: '50048501', roleId: 'SAP_FI_ACCOUNTANT', assignmentDate: '2024-01-10', requestId: 'REQ-003' },
        { employeeId: '50048501', roleId: 'SAP_FI_DISPLAY', assignmentDate: '2024-01-10', requestId: 'REQ-003' },
        { employeeId: '50048501', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-01-10', requestId: 'REQ-003' },

        { employeeId: '50048502', roleId: 'SAP_FI_ACCOUNTANT', assignmentDate: '2024-02-15', requestId: 'REQ-056' },
        { employeeId: '50048502', roleId: 'SAP_FI_DISPLAY', assignmentDate: '2024-02-15', requestId: 'REQ-056' },
        { employeeId: '50048502', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-02-15', requestId: 'REQ-056' },

        { employeeId: '50048503', roleId: 'SAP_FI_ACCOUNTANT', assignmentDate: '2024-03-20', requestId: 'REQ-098' },
        { employeeId: '50048503', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-03-20', requestId: 'REQ-098' },

        // HR Business Partner
        { employeeId: '50048601', roleId: 'SAP_HR_MANAGER', assignmentDate: '2024-01-15', requestId: 'REQ-007' },
        { employeeId: '50048601', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-01-15', requestId: 'REQ-007' },

        { employeeId: '50048602', roleId: 'SAP_HR_MANAGER', assignmentDate: '2024-02-20', requestId: 'REQ-067' },
        { employeeId: '50048602', roleId: 'SAP_HR_EMPLOYEE', assignmentDate: '2024-02-20', requestId: 'REQ-067' },
    ],

    // Active Directory Groups
    adGroups: [
        { groupId: 'AD-VPN-Users', groupName: 'VPN Access Users', groupType: 'Security', memberCount: 25 },
        { groupId: 'AD-Office365-E3', groupName: 'Office 365 E3 License', groupType: 'Distribution', memberCount: 27 },
        { groupId: 'AD-SharePoint-Water', groupName: 'SharePoint Waterexpertise', groupType: 'Security', memberCount: 12 },
        { groupId: 'AD-SharePoint-Production', groupName: 'SharePoint Production', groupType: 'Security', memberCount: 10 },
        { groupId: 'AD-SAP-Users', groupName: 'SAP System Access', groupType: 'Security', memberCount: 27 },
        { groupId: 'AD-Power-BI-Viewers', groupName: 'Power BI Report Viewers', groupType: 'Security', memberCount: 15 },
    ],

    // User AD Group Memberships
    userAdMemberships: [
        // All employees have basic access
        ...['50048221', '50048222', '50048223', '50048224', '50048225', '50048226', '50048227', '50048228', '50048229', '50048230'].flatMap(id => [
            { employeeId: id, groupId: 'AD-VPN-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-Office365-E3', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-SAP-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-SharePoint-Water', assignmentDate: '2024-01-01' },
        ]),

        ...['50048301', '50048302', '50048303', '50048304', '50048305', '50048306', '50048307', '50048308'].flatMap(id => [
            { employeeId: id, groupId: 'AD-VPN-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-Office365-E3', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-SAP-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-SharePoint-Production', assignmentDate: '2024-01-01' },
        ]),

        ...['50048401', '50048402', '50048403', '50048404'].flatMap(id => [
            { employeeId: id, groupId: 'AD-VPN-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-Office365-E3', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-SAP-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-Power-BI-Viewers', assignmentDate: '2024-01-01' },
        ]),

        ...['50048501', '50048502', '50048503'].flatMap(id => [
            { employeeId: id, groupId: 'AD-VPN-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-Office365-E3', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-SAP-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-Power-BI-Viewers', assignmentDate: '2024-01-01' },
        ]),

        ...['50048601', '50048602'].flatMap(id => [
            { employeeId: id, groupId: 'AD-VPN-Users', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-Office365-E3', assignmentDate: '2024-01-01' },
            { employeeId: id, groupId: 'AD-SAP-Users', assignmentDate: '2024-01-01' },
        ]),
    ],

    // Summary Statistics
    getSummary() {
        return {
            totalEmployees: this.hrData.length,
            totalFunctions: [...new Set(this.hrData.map(e => e.function))].length,
            totalRoles: this.grcRoles.length,
            totalGroups: this.adGroups.length,
            totalAssignments: this.userRoleAssignments.length,
        };
    },

    // Get users by function
    getUsersByFunction(functionName) {
        return this.hrData.filter(e => e.function === functionName);
    },

    // Get roles for user
    getRolesForUser(employeeId) {
        const assignments = this.userRoleAssignments.filter(a => a.employeeId === employeeId);
        return assignments.map(a => {
            const role = this.grcRoles.find(r => r.roleId === a.roleId);
            return { ...role, ...a };
        });
    },

    // Get all unique functions
    getAllFunctions() {
        return [...new Set(this.hrData.map(e => e.function))];
    }
};
