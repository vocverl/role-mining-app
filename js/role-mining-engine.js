// Role Mining Engine with Saturation Analysis
class RoleMiningEngine {
    constructor() {
        this.hrData = [];
        this.grcRoles = [];
        this.userRoleAssignments = [];
        this.adGroups = [];
        this.userAdMemberships = [];
        this.analysisResults = null;
        this.proposal = null;
        this.validationItems = [];
    }

    // Load data (from demo, upload, or live)
    loadData(source) {
        if (source === 'demo') {
            this.hrData = DemoData.hrData;
            this.grcRoles = DemoData.grcRoles;
            this.userRoleAssignments = DemoData.userRoleAssignments;
            this.adGroups = DemoData.adGroups;
            this.userAdMemberships = DemoData.userAdMemberships;
            return true;
        }
        // TODO: Implement upload and live data loading
        return false;
    }

    // Calculate saturation for a specific role within a function
    calculateRoleSaturation(functionName, roleId) {
        const usersInFunction = this.hrData.filter(e => e.function === functionName);
        const totalUsers = usersInFunction.length;

        if (totalUsers === 0) return 0;

        const usersWithRole = usersInFunction.filter(user => {
            return this.userRoleAssignments.some(
                assignment => assignment.employeeId === user.employeeId && assignment.roleId === roleId
            );
        }).length;

        return (usersWithRole / totalUsers) * 100;
    }

    // Calculate saturation for AD groups
    calculateAdGroupSaturation(functionName, groupId) {
        const usersInFunction = this.hrData.filter(e => e.function === functionName);
        const totalUsers = usersInFunction.length;

        if (totalUsers === 0) return 0;

        const usersWithGroup = usersInFunction.filter(user => {
            return this.userAdMemberships.some(
                membership => membership.employeeId === user.employeeId && membership.groupId === groupId
            );
        }).length;

        return (usersWithGroup / totalUsers) * 100;
    }

    // Main analysis function
    analyzeRoleMining() {
        const functions = [...new Set(this.hrData.map(e => e.function))];
        const results = {
            byFunction: {},
            topOpportunities: [],
            savings: {
                currentRequests: 0,
                expectedReduction: 0,
                hoursSaved: 0
            }
        };

        // Analyze each function
        functions.forEach(functionName => {
            const usersInFunction = this.hrData.filter(e => e.function === functionName);
            const functionAnalysis = {
                functionName: functionName,
                totalUsers: usersInFunction.length,
                roles: [],
                adGroups: [],
                opportunities: []
            };

            // Analyze SAP roles
            this.grcRoles.forEach(role => {
                const saturation = this.calculateRoleSaturation(functionName, role.roleId);
                if (saturation > 0) {
                    const roleAnalysis = {
                        roleId: role.roleId,
                        roleName: role.roleName,
                        roleType: role.roleType,
                        saturation: saturation,
                        usersWithRole: Math.round((saturation / 100) * functionAnalysis.totalUsers),
                        usersMissingRole: Math.round(((100 - saturation) / 100) * functionAnalysis.totalUsers)
                    };
                    functionAnalysis.roles.push(roleAnalysis);

                    // High saturation = opportunity
                    if (saturation >= 60 && saturation < 100) {
                        functionAnalysis.opportunities.push({
                            type: 'SAP Role',
                            ...roleAnalysis,
                            priority: saturation >= 80 ? 'high' : 'medium'
                        });
                    }
                }
            });

            // Analyze AD groups
            this.adGroups.forEach(group => {
                const saturation = this.calculateAdGroupSaturation(functionName, group.groupId);
                if (saturation > 0) {
                    const groupAnalysis = {
                        groupId: group.groupId,
                        groupName: group.groupName,
                        saturation: saturation,
                        usersWithGroup: Math.round((saturation / 100) * functionAnalysis.totalUsers),
                        usersMissingGroup: Math.round(((100 - saturation) / 100) * functionAnalysis.totalUsers)
                    };
                    functionAnalysis.adGroups.push(groupAnalysis);

                    if (saturation >= 60 && saturation < 100) {
                        functionAnalysis.opportunities.push({
                            type: 'AD Group',
                            ...groupAnalysis,
                            priority: saturation >= 80 ? 'high' : 'medium'
                        });
                    }
                }
            });

            results.byFunction[functionName] = functionAnalysis;
        });

        // Compile top opportunities across all functions
        Object.values(results.byFunction).forEach(funcAnalysis => {
            funcAnalysis.opportunities.forEach(opp => {
                results.topOpportunities.push({
                    ...opp,
                    functionName: funcAnalysis.functionName
                });
            });
        });

        // Sort by saturation (highest first)
        results.topOpportunities.sort((a, b) => b.saturation - a.saturation);

        // Calculate savings potential
        results.savings = this.calculateSavings(results);

        this.analysisResults = results;
        return results;
    }

    // Calculate potential savings
    calculateSavings(analysisResults) {
        let currentRequests = 0;
        let potentialAutomatic = 0;

        Object.values(analysisResults.byFunction).forEach(funcAnalysis => {
            // Current: each user requests roles individually
            funcAnalysis.roles.forEach(role => {
                currentRequests += role.usersWithRole;
            });

            // After role mining: high saturation roles become automatic
            funcAnalysis.opportunities.forEach(opp => {
                if (opp.saturation >= 80) {
                    potentialAutomatic += opp.usersWithRole || opp.usersWithGroup || 0;
                }
            });
        });

        const reduction = currentRequests > 0 ? (potentialAutomatic / currentRequests) * 100 : 0;
        const hoursPerRequest = 0.5; // 30 minutes per access request
        const hoursSaved = potentialAutomatic * hoursPerRequest;

        return {
            currentRequests: currentRequests,
            expectedReduction: Math.round(reduction),
            hoursSaved: Math.round(hoursSaved)
        };
    }

    // Generate proposal matrix
    generateProposalMatrix(minSaturation = 80) {
        if (!this.analysisResults) {
            throw new Error('Run analysis first');
        }

        const proposal = {
            timestamp: new Date().toISOString(),
            minSaturation: minSaturation,
            recommendations: []
        };

        Object.entries(this.analysisResults.byFunction).forEach(([functionName, funcAnalysis]) => {
            const functionRecommendations = {
                functionName: functionName,
                totalUsers: funcAnalysis.totalUsers,
                businessRoleChanges: [],
                sapRoles: [],
                adGroups: []
            };

            // SAP Roles that meet threshold
            funcAnalysis.roles.forEach(role => {
                if (role.saturation >= minSaturation) {
                    functionRecommendations.sapRoles.push({
                        roleId: role.roleId,
                        roleName: role.roleName,
                        saturation: role.saturation,
                        action: 'add_to_business_role',
                        affectedUsers: role.usersMissingRole,
                        status: 'pending_validation'
                    });
                }
            });

            // AD Groups that meet threshold
            funcAnalysis.adGroups.forEach(group => {
                if (group.saturation >= minSaturation) {
                    functionRecommendations.adGroups.push({
                        groupId: group.groupId,
                        groupName: group.groupName,
                        saturation: group.saturation,
                        action: 'add_to_business_role',
                        affectedUsers: group.usersMissingGroup,
                        status: 'pending_validation'
                    });
                }
            });

            if (functionRecommendations.sapRoles.length > 0 || functionRecommendations.adGroups.length > 0) {
                proposal.recommendations.push(functionRecommendations);
            }
        });

        this.proposal = proposal;
        return proposal;
    }

    // Create validation items for role owner
    createValidationItems() {
        if (!this.proposal) {
            throw new Error('Generate proposal first');
        }

        this.validationItems = [];

        this.proposal.recommendations.forEach(rec => {
            rec.sapRoles.forEach(role => {
                this.validationItems.push({
                    id: `VAL-${this.validationItems.length + 1}`,
                    type: 'SAP Role',
                    functionName: rec.functionName,
                    itemName: role.roleName,
                    itemId: role.roleId,
                    saturation: role.saturation,
                    affectedUsers: role.affectedUsers,
                    totalUsersInFunction: rec.totalUsers,
                    status: 'pending',
                    validatedBy: null,
                    validatedAt: null,
                    comments: null
                });
            });

            rec.adGroups.forEach(group => {
                this.validationItems.push({
                    id: `VAL-${this.validationItems.length + 1}`,
                    type: 'AD Group',
                    functionName: rec.functionName,
                    itemName: group.groupName,
                    itemId: group.groupId,
                    saturation: group.saturation,
                    affectedUsers: group.affectedUsers,
                    totalUsersInFunction: rec.totalUsers,
                    status: 'pending',
                    validatedBy: null,
                    validatedAt: null,
                    comments: null
                });
            });
        });

        return this.validationItems;
    }

    // Validate item (approve or reject)
    validateItem(itemId, status, comments = null) {
        const item = this.validationItems.find(v => v.id === itemId);
        if (item) {
            item.status = status;
            item.validatedAt = new Date().toISOString();
            item.validatedBy = 'Role Owner'; // In real app, would be current user
            item.comments = comments;
        }
        return item;
    }

    // Get validation summary
    getValidationSummary() {
        return {
            total: this.validationItems.length,
            pending: this.validationItems.filter(v => v.status === 'pending').length,
            approved: this.validationItems.filter(v => v.status === 'approved').length,
            rejected: this.validationItems.filter(v => v.status === 'rejected').length
        };
    }

    // Generate GRC export file
    generateGRCExport(format = 'xml') {
        const approvedItems = this.validationItems.filter(v => v.status === 'approved');

        if (format === 'xml') {
            return this.generateGRCXML(approvedItems);
        } else if (format === 'csv') {
            return this.generateGRCCSV(approvedItems);
        } else if (format === 'excel') {
            return this.generateGRCExcelData(approvedItems);
        }
    }

    // Generate GRC XML format
    generateGRCXML(items) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<GRCRoleImport>\n';
        xml += '  <Metadata>\n';
        xml += `    <CreatedDate>${new Date().toISOString()}</CreatedDate>\n`;
        xml += `    <CreatedBy>Role Mining Application</CreatedBy>\n`;
        xml += `    <TotalRoles>${items.length}</TotalRoles>\n`;
        xml += '  </Metadata>\n';
        xml += '  <BusinessRoles>\n';

        // Group by function
        const byFunction = {};
        items.forEach(item => {
            if (!byFunction[item.functionName]) {
                byFunction[item.functionName] = [];
            }
            byFunction[item.functionName].push(item);
        });

        Object.entries(byFunction).forEach(([functionName, functionItems]) => {
            const businessRoleId = 'BR-' + functionName.toUpperCase().replace(/\s+/g, '_');
            xml += `    <BusinessRole>\n`;
            xml += `      <RoleId>${businessRoleId}</RoleId>\n`;
            xml += `      <RoleName>${functionName} - Auto Generated</RoleName>\n`;
            xml += `      <Description>Auto-generated from role mining analysis (${new Date().toLocaleDateString()})</Description>\n`;
            xml += `      <AssignedRoles>\n`;

            functionItems.forEach(item => {
                if (item.type === 'SAP Role') {
                    xml += `        <TechnicalRole>\n`;
                    xml += `          <RoleId>${item.itemId}</RoleId>\n`;
                    xml += `          <RoleName>${item.itemName}</RoleName>\n`;
                    xml += `          <Saturation>${item.saturation.toFixed(2)}%</Saturation>\n`;
                    xml += `        </TechnicalRole>\n`;
                }
            });

            xml += `      </AssignedRoles>\n`;
            xml += `      <AssignedGroups>\n`;

            functionItems.forEach(item => {
                if (item.type === 'AD Group') {
                    xml += `        <ADGroup>\n`;
                    xml += `          <GroupId>${item.itemId}</GroupId>\n`;
                    xml += `          <GroupName>${item.itemName}</GroupName>\n`;
                    xml += `          <Saturation>${item.saturation.toFixed(2)}%</Saturation>\n`;
                    xml += `        </ADGroup>\n`;
                }
            });

            xml += `      </AssignedGroups>\n`;
            xml += `    </BusinessRole>\n`;
        });

        xml += '  </BusinessRoles>\n';
        xml += '</GRCRoleImport>';

        return xml;
    }

    // Generate GRC CSV format
    generateGRCCSV(items) {
        let csv = 'Function,Type,Item ID,Item Name,Saturation,Affected Users,Status,Validated At\n';

        items.forEach(item => {
            csv += `"${item.functionName}","${item.type}","${item.itemId}","${item.itemName}",`;
            csv += `${item.saturation.toFixed(2)},${item.affectedUsers},"${item.status}","${item.validatedAt}"\n`;
        });

        return csv;
    }

    // Generate data for Excel export
    generateGRCExcelData(items) {
        return {
            headers: ['Function', 'Type', 'Item ID', 'Item Name', 'Saturation %', 'Affected Users', 'Status', 'Validated At'],
            rows: items.map(item => [
                item.functionName,
                item.type,
                item.itemId,
                item.itemName,
                item.saturation.toFixed(2),
                item.affectedUsers,
                item.status,
                item.validatedAt
            ])
        };
    }

    // Simulate reprovisioning
    async simulateReprovisioning(onProgress) {
        const approvedItems = this.validationItems.filter(v => v.status === 'approved');
        const totalSteps = approvedItems.length * 2; // SAP + AD
        let currentStep = 0;

        const results = {
            sap: { success: 0, failed: 0, details: [] },
            ad: { success: 0, failed: 0, details: [] }
        };

        // Simulate SAP provisioning
        for (const item of approvedItems) {
            if (item.type === 'SAP Role') {
                await this.delay(500);
                currentStep++;
                const success = Math.random() > 0.05; // 95% success rate

                if (success) {
                    results.sap.success++;
                    results.sap.details.push(`✓ Provisioned ${item.itemName} to ${item.affectedUsers} users`);
                } else {
                    results.sap.failed++;
                    results.sap.details.push(`✗ Failed to provision ${item.itemName}`);
                }

                if (onProgress) {
                    onProgress('sap', (currentStep / totalSteps) * 100, results.sap.details[results.sap.details.length - 1]);
                }
            }
        }

        // Simulate AD provisioning
        for (const item of approvedItems) {
            if (item.type === 'AD Group') {
                await this.delay(500);
                currentStep++;
                const success = Math.random() > 0.05;

                if (success) {
                    results.ad.success++;
                    results.ad.details.push(`✓ Added ${item.affectedUsers} users to ${item.itemName}`);
                } else {
                    results.ad.failed++;
                    results.ad.details.push(`✗ Failed to add users to ${item.itemName}`);
                }

                if (onProgress) {
                    onProgress('ad', (currentStep / totalSteps) * 100, results.ad.details[results.ad.details.length - 1]);
                }
            }
        }

        return results;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
