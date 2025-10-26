// Main Application Logic
const RoleMining = {
    engine: new RoleMiningEngine(),
    currentMode: 'demo',
    currentStep: 1,

    init() {
        this.setupModeSelectors();
        this.setupFileUploads();
        this.loadDemoData();
        this.updateStepIndicator(1);
    },

    // Setup mode selector buttons
    setupModeSelectors() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentMode = e.currentTarget.dataset.mode;
                this.handleModeChange();
            });
        });
    },

    // Handle mode change
    handleModeChange() {
        const demoNotice = document.getElementById('demo-notice');
        const uploadButtons = document.querySelectorAll('.btn-upload');

        if (this.currentMode === 'demo') {
            demoNotice.style.display = 'flex';
            uploadButtons.forEach(btn => btn.style.display = 'none');
            this.loadDemoData();
        } else if (this.currentMode === 'upload') {
            demoNotice.style.display = 'none';
            uploadButtons.forEach(btn => btn.style.display = 'inline-block');
        } else if (this.currentMode === 'live') {
            demoNotice.innerHTML = '<div class="notice-icon">⚡</div><div><strong>Live Modus</strong><br>Verbinding met live systemen wordt opgezet...</div>';
            demoNotice.style.display = 'flex';
            uploadButtons.forEach(btn => btn.style.display = 'none');
        }
    },

    // Setup file upload handlers
    setupFileUploads() {
        document.getElementById('sf-upload').addEventListener('change', (e) => this.handleFileUpload(e, 'sf'));
        document.getElementById('grc-upload').addEventListener('change', (e) => this.handleFileUpload(e, 'grc'));
        document.getElementById('ad-upload').addEventListener('change', (e) => this.handleFileUpload(e, 'ad'));
    },

    // Handle file upload
    async handleFileUpload(event, source) {
        const file = event.target.files[0];
        if (!file) return;

        const statusEl = document.getElementById(`${source}-status`);
        statusEl.textContent = 'Bezig met laden...';

        // Simulate file processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        statusEl.textContent = `Geladen: ${file.name}`;
        statusEl.classList.add('loaded');

        // TODO: Parse actual file
        // For now, use demo data
        this.checkAllDataLoaded();
    },

    // Load demo data
    loadDemoData() {
        this.engine.loadData('demo');

        document.getElementById('sf-status').textContent = 'Demo data geladen';
        document.getElementById('sf-status').classList.add('loaded');
        document.getElementById('grc-status').textContent = 'Demo data geladen';
        document.getElementById('grc-status').classList.add('loaded');
        document.getElementById('ad-status').textContent = 'Demo data geladen';
        document.getElementById('ad-status').classList.add('loaded');

        this.showDataSummary();
    },

    // Check if all data is loaded
    checkAllDataLoaded() {
        const allLoaded = ['sf', 'grc', 'ad'].every(source => {
            return document.getElementById(`${source}-status`).classList.contains('loaded');
        });

        if (allLoaded) {
            this.showDataSummary();
        }
    },

    // Show data summary
    showDataSummary() {
        const summary = DemoData.getSummary();
        const summaryEl = document.getElementById('data-summary');

        document.getElementById('total-employees').textContent = summary.totalEmployees;
        document.getElementById('total-functions').textContent = summary.totalFunctions;
        document.getElementById('total-roles').textContent = summary.totalRoles;
        document.getElementById('total-groups').textContent = summary.totalGroups;

        summaryEl.style.display = 'block';
    },

    // Start role mining analysis
    async startAnalysis() {
        this.goToStep(2);

        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        // Simulate progress
        const steps = [
            'Laden van data...',
            'Analyseren van functies...',
            'Berekenen van saturatie niveaus...',
            'Identificeren van opportunities...',
            'Berekenen van besparingen...',
            'Analyse voltooid!'
        ];

        for (let i = 0; i < steps.length; i++) {
            const progress = ((i + 1) / steps.length) * 100;
            progressFill.style.width = progress + '%';
            progressFill.textContent = Math.round(progress) + '%';
            progressText.textContent = steps[i];
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Run actual analysis
        const results = this.engine.analyzeRoleMining();
        this.displayAnalysisResults(results);
    },

    // Display analysis results
    displayAnalysisResults(results) {
        document.getElementById('analysis-results').style.display = 'block';
        document.getElementById('btn-generate-proposal').style.display = 'inline-block';

        // Display saturation by function
        const saturationHtml = this.generateSaturationByFunctionHTML(results);
        document.getElementById('saturation-by-function').innerHTML = saturationHtml;

        // Display top opportunities
        const opportunitiesHtml = this.generateTopOpportunitiesHTML(results);
        document.getElementById('top-opportunities').innerHTML = opportunitiesHtml;

        // Display savings
        document.getElementById('current-requests').textContent = results.savings.currentRequests;
        document.getElementById('expected-reduction').textContent = results.savings.expectedReduction + '%';
        document.getElementById('hours-saved').textContent = results.savings.hoursSaved + ' uur';
    },

    // Generate saturation by function HTML
    generateSaturationByFunctionHTML(results) {
        let html = '<div class="function-list">';

        Object.entries(results.byFunction).forEach(([functionName, data]) => {
            const highSatRoles = data.roles.filter(r => r.saturation >= 80).length;
            const medSatRoles = data.roles.filter(r => r.saturation >= 60 && r.saturation < 80).length;

            html += `
                <div class="function-item" style="background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid #1976d2;">
                    <div style="font-weight: 600; margin-bottom: 10px;">${functionName}</div>
                    <div style="font-size: 0.9em; color: #666;">
                        ${data.totalUsers} medewerkers |
                        <span style="color: #4CAF50;">${highSatRoles} hoge saturatie rollen</span> |
                        <span style="color: #FFC107;">${medSatRoles} gemiddelde saturatie rollen</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    // Generate top opportunities HTML
    generateTopOpportunitiesHTML(results) {
        const top10 = results.topOpportunities.slice(0, 10);
        let html = '<div class="opportunities-list">';

        top10.forEach((opp, index) => {
            const priorityColor = opp.priority === 'high' ? '#4CAF50' : '#FFC107';
            const priorityText = opp.priority === 'high' ? 'Hoge prioriteit' : 'Gemiddelde prioriteit';

            html += `
                <div class="opportunity-item" style="background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid ${priorityColor};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 5px;">${opp.roleName || opp.groupName}</div>
                            <div style="font-size: 0.85em; color: #666;">
                                ${opp.functionName} | ${opp.type}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.5em; font-weight: bold; color: ${priorityColor};">
                                ${opp.saturation.toFixed(0)}%
                            </div>
                            <div style="font-size: 0.8em; color: #666;">${priorityText}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    // Generate proposal matrix
    async generateProposal() {
        this.goToStep(3);

        const threshold = parseInt(document.getElementById('saturation-threshold').value);
        const proposal = this.engine.generateProposalMatrix(threshold);

        this.displayProposalMatrix(proposal);
        this.setupProposalControls();
    },

    // Display proposal matrix
    displayProposalMatrix(proposal) {
        const matrixEl = document.getElementById('proposal-matrix');
        let html = '<table class="matrix-table">';

        // Header
        html += '<thead><tr>';
        html += '<th>Functie</th>';
        html += '<th>Type</th>';
        html += '<th>Rol / Groep</th>';
        html += '<th>Saturatie</th>';
        html += '<th>Medewerkers</th>';
        html += '<th>Impact</th>';
        html += '<th>Actie</th>';
        html += '</tr></thead>';

        html += '<tbody>';

        proposal.recommendations.forEach(rec => {
            // SAP Roles
            rec.sapRoles.forEach((role, index) => {
                const satClass = role.saturation >= 90 ? 'saturation-high' :
                                role.saturation >= 80 ? 'saturation-medium' : 'saturation-low';

                html += '<tr>';
                if (index === 0) {
                    html += `<td rowspan="${rec.sapRoles.length + rec.adGroups.length}" style="font-weight: 600; background: #f5f5f5;">${rec.functionName}</td>`;
                }
                html += `<td><span style="padding: 4px 8px; background: #2196F3; color: white; border-radius: 4px; font-size: 0.8em;">SAP Role</span></td>`;
                html += `<td>${role.roleName}</td>`;
                html += `<td><div class="saturation-cell ${satClass}">${role.saturation.toFixed(1)}%</div></td>`;
                html += `<td>${rec.totalUsers} (${role.affectedUsers} ontbreekt)</td>`;
                html += `<td>${this.getImpactBadge(role.affectedUsers)}</td>`;
                html += `<td>Toevoegen aan bedrijfsrol</td>`;
                html += '</tr>';
            });

            // AD Groups
            rec.adGroups.forEach(group => {
                const satClass = group.saturation >= 90 ? 'saturation-high' :
                                group.saturation >= 80 ? 'saturation-medium' : 'saturation-low';

                html += '<tr>';
                html += `<td><span style="padding: 4px 8px; background: #4CAF50; color: white; border-radius: 4px; font-size: 0.8em;">AD Group</span></td>`;
                html += `<td>${group.groupName}</td>`;
                html += `<td><div class="saturation-cell ${satClass}">${group.saturation.toFixed(1)}%</div></td>`;
                html += `<td>${rec.totalUsers} (${group.affectedUsers} ontbreekt)</td>`;
                html += `<td>${this.getImpactBadge(group.affectedUsers)}</td>`;
                html += `<td>Toevoegen aan bedrijfsrol</td>`;
                html += '</tr>';
            });
        });

        html += '</tbody></table>';
        matrixEl.innerHTML = html;
    },

    // Get impact badge
    getImpactBadge(affectedUsers) {
        if (affectedUsers >= 5) {
            return '<span style="padding: 4px 8px; background: #4CAF50; color: white; border-radius: 4px; font-size: 0.8em;">Hoog</span>';
        } else if (affectedUsers >= 2) {
            return '<span style="padding: 4px 8px; background: #FFC107; color: #333; border-radius: 4px; font-size: 0.8em;">Gemiddeld</span>';
        } else {
            return '<span style="padding: 4px 8px; background: #2196F3; color: white; border-radius: 4px; font-size: 0.8em;">Laag</span>';
        }
    },

    // Setup proposal controls
    setupProposalControls() {
        const thresholdSlider = document.getElementById('saturation-threshold');
        const thresholdValue = document.getElementById('saturation-value');
        const functionFilter = document.getElementById('function-filter');
        const viewMode = document.getElementById('view-mode');

        // Populate function filter dropdown
        const functions = [...new Set(this.engine.hrData.map(e => e.function))];
        functionFilter.innerHTML = '<option value="">Alle functies</option>';
        functions.forEach(func => {
            functionFilter.innerHTML += `<option value="${func}">${func}</option>`;
        });

        // Threshold slider handlers
        thresholdSlider.addEventListener('input', (e) => {
            thresholdValue.textContent = e.target.value + '%';
        });

        thresholdSlider.addEventListener('change', (e) => {
            const newThreshold = parseInt(e.target.value);
            const proposal = this.engine.generateProposalMatrix(newThreshold);
            this.displayProposalMatrix(proposal);
        });

        // Function filter handler
        functionFilter.addEventListener('change', (e) => {
            this.filterProposalByFunction(e.target.value);
        });

        // View mode toggle handler
        viewMode.addEventListener('change', (e) => {
            this.toggleProposalView(e.target.value);
        });
    },

    // Filter proposal by function
    filterProposalByFunction(functionName) {
        const rows = document.querySelectorAll('.matrix-table tbody tr');
        rows.forEach(row => {
            const firstCell = row.querySelector('td:first-child');
            if (!functionName || firstCell.textContent.includes(functionName)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    },

    // Toggle between matrix and summary view
    toggleProposalView(mode) {
        const matrixDiv = document.getElementById('proposal-matrix');
        const summaryDiv = document.getElementById('proposal-summary');

        if (mode === 'matrix') {
            matrixDiv.style.display = 'block';
            summaryDiv.style.display = 'none';
        } else {
            matrixDiv.style.display = 'none';
            summaryDiv.style.display = 'block';
        }
    },

    // Export proposal
    exportProposal() {
        const data = this.engine.generateGRCExcelData(this.engine.validationItems || []);
        // In real app, would generate actual Excel file
        alert('Proposal wordt gedownload als Excel bestand...\n\n(In demo modus zou hier een echte download plaatsvinden)');
    },

    // Start validation process
    startValidation() {
        this.goToStep(4);

        const validationItems = this.engine.createValidationItems();
        this.displayValidationItems(validationItems);
    },

    // Display validation items
    displayValidationItems(items) {
        const listEl = document.getElementById('validation-list');
        let html = '';

        items.forEach(item => {
            html += `
                <div class="validation-item" data-item-id="${item.id}">
                    <div class="validation-header">
                        <div class="validation-title">
                            ${item.itemName}
                            <span style="margin-left: 10px; padding: 3px 8px; background: ${item.type === 'SAP Role' ? '#2196F3' : '#4CAF50'}; color: white; border-radius: 4px; font-size: 0.8em;">${item.type}</span>
                        </div>
                        <div class="validation-status ${item.status}">${item.status === 'pending' ? 'Te valideren' : item.status}</div>
                    </div>
                    <div class="validation-details">
                        <strong>Functie:</strong> ${item.functionName}<br>
                        <strong>Saturatie:</strong> ${item.saturation.toFixed(1)}% (${item.totalUsersInFunction - item.affectedUsers} van ${item.totalUsersInFunction} medewerkers hebben deze al)<br>
                        <strong>Impact:</strong> ${item.affectedUsers} medewerkers krijgen deze automatisch
                    </div>
                    <div class="validation-actions">
                        <button class="btn-approve" onclick="RoleMining.validateItem('${item.id}', 'approved')">✓ Goedkeuren</button>
                        <button class="btn-reject" onclick="RoleMining.validateItem('${item.id}', 'rejected')">✗ Afkeuren</button>
                    </div>
                </div>
            `;
        });

        listEl.innerHTML = html;
        this.updateValidationSummary();
    },

    // Validate item
    validateItem(itemId, status) {
        this.engine.validateItem(itemId, status);

        const itemEl = document.querySelector(`[data-item-id="${itemId}"]`);
        const statusEl = itemEl.querySelector('.validation-status');
        const actionsEl = itemEl.querySelector('.validation-actions');

        statusEl.textContent = status === 'approved' ? 'Goedgekeurd' : 'Afgekeurd';
        statusEl.className = `validation-status ${status}`;
        actionsEl.innerHTML = `<span style="color: #666; font-size: 0.9em;">Gevalideerd</span>`;

        this.updateValidationSummary();
    },

    // Update validation summary
    updateValidationSummary() {
        const summary = this.engine.getValidationSummary();

        document.getElementById('pending-validations').textContent = summary.pending;
        document.getElementById('approved-validations').textContent = summary.approved;
        document.getElementById('rejected-validations').textContent = summary.rejected;

        const btnExport = document.getElementById('btn-prepare-export');
        if (summary.pending === 0 && summary.approved > 0) {
            btnExport.disabled = false;
        }
    },

    // Prepare export
    prepareExport() {
        this.goToStep(5);

        const approvedItems = this.engine.validationItems.filter(v => v.status === 'approved');
        const preview = this.engine.generateGRCXML(approvedItems);

        document.getElementById('preview-content').textContent = preview;
    },

    // Download export
    downloadExport() {
        const format = document.getElementById('export-format').value;
        let content, filename, mimeType;

        if (format === 'grc-xml') {
            content = this.engine.generateGRCExport('xml');
            filename = 'grc-role-import.xml';
            mimeType = 'application/xml';
        } else if (format === 'csv') {
            content = this.engine.generateGRCExport('csv');
            filename = 'grc-role-import.csv';
            mimeType = 'text/csv';
        } else {
            alert('Excel export wordt voorbereid...');
            return;
        }

        // Create download
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    // Send to GRC
    async sendToGRC() {
        this.goToStep(6);

        const importIcon = document.getElementById('import-icon');
        const importMessage = document.getElementById('import-message');

        importMessage.textContent = 'Bezig met uploaden naar GRC BRM...';

        await new Promise(resolve => setTimeout(resolve, 2000));

        importIcon.textContent = '✅';
        importMessage.textContent = 'Import succesvol voltooid!';

        document.getElementById('import-details').style.display = 'block';
        document.getElementById('import-time').textContent = new Date().toLocaleString('nl-NL');
        document.getElementById('import-roles-count').textContent = this.engine.validationItems.filter(v => v.status === 'approved').length;
        document.getElementById('import-status-text').textContent = 'Voltooid';

        document.getElementById('btn-start-repro').disabled = false;
    },

    // Start reprovisioning
    async startReprovisioning() {
        this.goToStep(7);

        const results = await this.engine.simulateReprovisioning((system, progress, message) => {
            const progressEl = document.getElementById(`${system}-progress`);
            const statusEl = document.getElementById(`${system}-status-text`);
            const detailsEl = document.getElementById(`${system}-details`);

            progressEl.style.width = progress + '%';
            statusEl.textContent = `Bezig... ${Math.round(progress)}%`;

            if (detailsEl.innerHTML) {
                detailsEl.innerHTML += '<br>' + message;
            } else {
                detailsEl.innerHTML = message;
            }
        });

        // Show completion
        document.getElementById('sap-status-text').textContent = 'Voltooid';
        document.getElementById('ad-status-text').textContent = 'Voltooid';

        const totalUsers = new Set(this.engine.validationItems
            .filter(v => v.status === 'approved')
            .map(v => v.affectedUsers)).size;

        document.getElementById('repro-summary').style.display = 'block';
        document.getElementById('repro-users').textContent = totalUsers;
        document.getElementById('repro-roles').textContent = this.engine.validationItems.filter(v => v.status === 'approved').length;
        document.getElementById('repro-removed').textContent = '0';
    },

    // Finish process
    finishProcess() {
        alert('Role mining proces voltooid!\n\nAlle goedgekeurde rollen zijn toegevoegd aan de bedrijfsrollen en geprovisioneerd naar de systemen.\n\nNieuwe medewerkers krijgen deze rollen nu automatisch.');
        this.goToStep(1);
    },

    // Navigate to step
    goToStep(stepNumber) {
        this.currentStep = stepNumber;

        // Update step indicator
        this.updateStepIndicator(stepNumber);

        // Show correct content
        document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
        document.getElementById(`step-${stepNumber}`).classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Update step indicator
    updateStepIndicator(currentStep) {
        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNum = index + 1;
            if (stepNum < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    RoleMining.init();
});
