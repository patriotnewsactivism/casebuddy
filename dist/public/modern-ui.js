/**
 * CaseBuddy Modern UI - Interactive Functionality
 * Complete JavaScript for the modern, professional interface
 */

(function() {
    'use strict';

    // Application State
    let currentCase = null;
    let cases = [];
    let documents = [];
    let evidence = [];
    let timeline = [];
    let foiaRequests = [];

    // Initialize sample data
    function initializeSampleData() {
        cases = [
            {
                id: '1',
                title: 'Police Misconduct Case #2024-001',
                description: 'This case involves an investigation into alleged excessive force used by police officers during a routine traffic stop. The incident occurred on January 15, 2024, and involves multiple witnesses, body camera footage, and medical records.',
                status: 'active',
                date: 'Jan 15, 2024',
                assignee: 'Legal Team',
                documentsCount: 5,
                evidenceCount: 8,
                timelineCount: 12
            },
            {
                id: '2',
                title: 'Civil Rights Violation #2024-002',
                description: 'First Amendment rights case involving peaceful protest restrictions.',
                status: 'pending',
                date: 'Jan 10, 2024',
                assignee: 'Legal Team',
                documentsCount: 3,
                evidenceCount: 4,
                timelineCount: 8
            },
            {
                id: '3',
                title: 'Government Transparency #2024-003',
                description: 'FOIA request follow-up for government document disclosure.',
                status: 'closed',
                date: 'Dec 28, 2023',
                assignee: 'Legal Team',
                documentsCount: 7,
                evidenceCount: 2,
                timelineCount: 15
            }
        ];

        documents = [
            {
                id: '1',
                caseId: '1',
                name: 'Police Report #2024-001',
                description: 'Initial incident report filed by responding officers',
                type: 'PDF',
                size: '2.3 MB',
                date: 'Jan 15, 2024',
                icon: 'fas fa-file-pdf'
            },
            {
                id: '2',
                caseId: '1',
                name: 'Medical Records',
                description: 'Hospital records from victim\'s treatment',
                type: 'PDF',
                size: '1.8 MB',
                date: 'Jan 15, 2024',
                icon: 'fas fa-file-medical'
            },
            {
                id: '3',
                caseId: '1',
                name: 'Witness Statements',
                description: 'Collected statements from eyewitnesses',
                type: 'DOCX',
                size: '0.9 MB',
                date: 'Jan 16, 2024',
                icon: 'fas fa-file-word'
            }
        ];

        evidence = [
            {
                id: '1',
                caseId: '1',
                name: 'Body Camera Footage',
                description: 'Officer\'s body camera recording of the incident',
                type: 'video',
                thumbnail: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=200&fit=crop',
                tags: ['Video', 'Critical']
            },
            {
                id: '2',
                caseId: '1',
                name: 'Scene Photos',
                description: 'Crime scene photography',
                type: 'image',
                thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop',
                tags: ['Photo', 'Evidence']
            }
        ];

        timeline = [
            {
                id: '1',
                caseId: '1',
                date: 'January 15, 2024 - 2:30 PM',
                title: 'Traffic Stop Initiated',
                description: 'Officers initiated a routine traffic stop for alleged speeding violation.'
            },
            {
                id: '2',
                caseId: '1',
                date: 'January 15, 2024 - 2:35 PM',
                title: 'Incident Escalation',
                description: 'Situation escalated leading to use of force by officers.'
            },
            {
                id: '3',
                caseId: '1',
                date: 'January 15, 2024 - 2:45 PM',
                title: 'Medical Assistance Called',
                description: 'Emergency medical services were called to the scene.'
            }
        ];

        foiaRequests = [
            {
                id: '1',
                caseId: '1',
                title: 'Body Camera Footage Request',
                description: 'Request for all body camera footage from officers involved in the January 15, 2024 incident.',
                status: 'pending',
                submitted: 'Jan 20, 2024',
                due: 'Feb 19, 2024'
            },
            {
                id: '2',
                caseId: '1',
                title: 'Police Training Records',
                description: 'Request for training records of officers involved in the incident.',
                status: 'active',
                submitted: 'Jan 22, 2024',
                due: 'Feb 21, 2024'
            }
        ];

        // Set first case as current
        currentCase = cases[0];
    }

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeSampleData();
        initializeEventListeners();
        hideLoadingScreen();
        updateCaseDisplay();
    });

    // Hide loading screen
    function hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }

    // Initialize all event listeners
    function initializeEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                switchTab(this.dataset.tab);
            });
        });

        // Case switching
        document.querySelectorAll('.case-item').forEach(item => {
            item.addEventListener('click', function() {
                selectCase(this.dataset.caseId);
            });
        });

        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                switchNavigation(this.dataset.tab);
            });
        });

        // Action buttons
        const buttons = [
            { id: 'upload-doc-btn', action: showUploadModal },
            { id: 'add-evidence-tab-btn', action: showEvidenceModal },
            { id: 'find-similar-btn', action: findSimilarCases },
            { id: 'predict-timeline-btn', action: predictTimeline },
            { id: 'create-foia-tab-btn', action: showFoiaModal },
            { id: 'new-case-btn', action: showNewCaseModal },
            { id: 'add-case-btn', action: showNewCaseModal }
        ];

        buttons.forEach(({ id, action }) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', action);
            }
        });

        // Document analyze buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.btn') && e.target.closest('.btn').textContent.includes('Analyze')) {
                showAnalysisModal();
            }
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }
    }

    // Theme toggle functionality
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // Tab switching
    function switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName + '-tab');
        
        if (activeTab) activeTab.classList.add('active');
        if (activeContent) activeContent.classList.add('active');

        // Update content based on tab
        updateTabContent(tabName);
    }

    // Navigation switching
    function switchNavigation(navItem) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const activeNav = document.querySelector(`[data-tab="${navItem}"]`);
        if (activeNav) activeNav.classList.add('active');
    }

    // Case selection
    function selectCase(caseId) {
        // Remove active class from all case items
        document.querySelectorAll('.case-item').forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        const activeCase = document.querySelector(`[data-case-id="${caseId}"]`);
        if (activeCase) activeCase.classList.add('active');

        // Update current case
        currentCase = cases.find(c => c.id === caseId);
        updateCaseDisplay();
    }

    // Update case display
    function updateCaseDisplay() {
        if (!currentCase) return;

        // Update case header
        const elements = {
            'case-title-display': currentCase.title,
            'case-description-display': currentCase.description,
            'case-date': `Created: ${currentCase.date}`,
            'case-assignee': `Assigned to: ${currentCase.assignee}`,
            'case-status': currentCase.status,
            'documents-count': currentCase.documentsCount,
            'evidence-count': currentCase.evidenceCount,
            'timeline-count': currentCase.timelineCount
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Update status badge class
        const statusBadge = document.getElementById('case-status');
        if (statusBadge) {
            statusBadge.className = `case-badge ${currentCase.status}`;
        }

        // Update tab counts
        const tabCounts = document.querySelectorAll('.tab-count');
        tabCounts.forEach((count, index) => {
            const counts = [currentCase.documentsCount, currentCase.evidenceCount, currentCase.timelineCount, 0, 2];
            if (counts[index] !== undefined) {
                count.textContent = counts[index];
            }
        });

        // Update current content
        updateTabContent('documents'); // Default to documents tab
    }

    // Update tab content
    function updateTabContent(tabName) {
        switch (tabName) {
            case 'documents':
                updateDocumentsGrid();
                break;
            case 'evidence':
                updateEvidenceGrid();
                break;
            case 'timeline':
                updateTimelineView();
                break;
            case 'similar':
                updateSimilarCases();
                break;
            case 'foia':
                updateFoiaRequests();
                break;
        }
    }

    // Update documents grid
    function updateDocumentsGrid() {
        const grid = document.getElementById('documents-grid');
        if (!grid) return;

        const caseDocuments = documents.filter(doc => doc.caseId === currentCase.id);
        
        grid.innerHTML = caseDocuments.map(doc => `
            <div class="document-card">
                <div class="document-icon">
                    <i class="${doc.icon}"></i>
                </div>
                <div class="document-info">
                    <h4>${doc.name}</h4>
                    <p>${doc.description}</p>
                    <div class="document-meta">
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${doc.date}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-file"></i>
                            <span>${doc.type}, ${doc.size}</span>
                        </div>
                    </div>
                    <div class="document-actions">
                        <button class="btn small">
                            <i class="fas fa-eye"></i>
                            View
                        </button>
                        <button class="btn small primary">
                            <i class="fas fa-magic"></i>
                            Analyze
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update evidence grid
    function updateEvidenceGrid() {
        const grid = document.getElementById('evidence-grid');
        if (!grid) return;

        const caseEvidence = evidence.filter(ev => ev.caseId === currentCase.id);
        
        grid.innerHTML = caseEvidence.map(ev => `
            <div class="evidence-card">
                <div class="evidence-preview">
                    <img src="${ev.thumbnail}" alt="${ev.name}">
                    <div class="evidence-overlay">
                        <button class="btn primary">
                            <i class="fas fa-${ev.type === 'video' ? 'play' : 'eye'}"></i>
                            ${ev.type === 'video' ? 'Play Video' : 'View Image'}
                        </button>
                    </div>
                </div>
                <div class="evidence-info">
                    <h4>${ev.name}</h4>
                    <p>${ev.description}</p>
                    <div class="evidence-meta">
                        ${ev.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update timeline view
    function updateTimelineView() {
        const timelineEl = document.getElementById('timeline');
        if (!timelineEl) return;

        const caseTimeline = timeline.filter(event => event.caseId === currentCase.id);
        
        timelineEl.innerHTML = caseTimeline.map((event, index) => `
            <div class="timeline-item">
                <div class="timeline-marker">
                    <div class="timeline-dot"></div>
                    ${index < caseTimeline.length - 1 ? '<div class="timeline-line"></div>' : ''}
                </div>
                <div class="timeline-content">
                    <div class="timeline-date">${event.date}</div>
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Update similar cases
    function updateSimilarCases() {
        const container = document.getElementById('similar-cases');
        if (!container) return;

        container.innerHTML = `
            <div class="similar-case">
                <div class="similarity-score">
                    <svg class="circular-chart" viewBox="0 0 36 36">
                        <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <path class="circle" stroke-dasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <text x="18" y="20.35" class="percentage">85%</text>
                    </svg>
                </div>
                <div class="case-info">
                    <h4>Police Misconduct Case #2023-045</h4>
                    <p>Similar excessive force incident from last year with comparable circumstances.</p>
                    <div class="tags">
                        <span class="tag">Excessive Force</span>
                        <span class="tag">Traffic Stop</span>
                        <span class="tag">Body Camera</span>
                    </div>
                </div>
                <div class="case-actions">
                    <button class="btn small">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="btn small primary">
                        <i class="fas fa-balance-scale"></i>
                        Compare
                    </button>
                </div>
            </div>
        `;
    }

    // Update FOIA requests
    function updateFoiaRequests() {
        const container = document.getElementById('foia-requests');
        if (!container) return;

        const caseFoia = foiaRequests.filter(req => req.caseId === currentCase.id);
        
        container.innerHTML = caseFoia.map(req => `
            <div class="foia-request">
                <div class="request-header">
                    <h4>${req.title}</h4>
                    <span class="status-badge ${req.status}">${req.status}</span>
                </div>
                <div class="request-description">
                    ${req.description}
                </div>
                <div class="request-meta">
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>Submitted: ${req.submitted}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>Due: ${req.due}</span>
                    </div>
                </div>
                <div class="request-actions">
                    <button class="btn small">
                        <i class="fas fa-eye"></i>
                        View
                    </button>
                    <button class="btn small primary">
                        <i class="fas fa-magic"></i>
                        Optimize
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Modal functions
    function showUploadModal() {
        showNotification('Upload Document', 'Document upload functionality would be implemented here.');
    }

    function showEvidenceModal() {
        showNotification('Add Evidence', 'Evidence upload functionality would be implemented here.');
    }

    function showNewCaseModal() {
        showNotification('New Case', 'New case creation form would be implemented here.');
    }

    function showFoiaModal() {
        showNotification('Create FOIA Request', 'FOIA request creation form would be implemented here.');
    }

    function showAnalysisModal() {
        showNotification('AI Analysis', 'AI document analysis results would be displayed here.');
    }

    // AI Features
    function findSimilarCases() {
        showNotification('Finding Similar Cases', 'AI is analyzing case patterns and finding similar cases...');
        setTimeout(() => {
            updateSimilarCases();
            showNotification('Analysis Complete', 'Found 3 similar cases with high confidence scores.');
        }, 2000);
    }

    function predictTimeline() {
        showNotification('AI Timeline Prediction', 'AI is analyzing case data to predict future events...');
        setTimeout(() => {
            showNotification('Prediction Complete', 'Timeline predictions have been generated based on similar cases.');
        }, 2000);
    }

    // Search functionality
    function handleSearch(e) {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) return;

        // Simple search implementation
        console.log('Searching for:', query);
        showNotification('Search', `Searching for "${query}" across all cases, documents, and evidence...`);
    }

    // Notification system
    function showNotification(title, message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="toast-text">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        notification.querySelector('.toast-close').addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Initialize the application
    console.log('CaseBuddy Modern UI initialized successfully');

})();