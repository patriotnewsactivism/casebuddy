/*
 * CaseBuddy upgraded web application logic.
 *
 * This script provides all interactive functionality for managing cases,
 * including adding and selecting cases, uploading documents and evidence,
 * managing timeline events, recording FOIA requests and searching across
 * all stored items. All data is persisted in browser localStorage so
 * there is no backend dependency. If you clear your browser storage
 * the information will be lost, so make sure to export data if required.
 */

(function () {
  // Helper to generate a simple unique identifier
  function uuid() {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 10)
    );
  }

  // Load cases from localStorage or initialise empty array
  let cases = [];
  try {
    const stored = localStorage.getItem('cases');
    cases = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(cases)) cases = [];
  } catch (err) {
    console.warn('Error reading cases from storage', err);
    cases = [];
  }

  // DOM element references
  const casesListEl = document.getElementById('cases-list');
  const searchInputEl = document.getElementById('search-input');
  const searchResultsEl = document.getElementById('search-results');
  const newCaseForm = document.getElementById('new-case-form');
  const caseTitleInput = document.getElementById('case-title');
  const caseDescInput = document.getElementById('case-description');
  const caseDetailsEl = document.getElementById('case-details');
  const noSelectionEl = document.getElementById('no-selection');
  const caseInfoEl = document.getElementById('case-info');
  const caseTitleDisplay = document.getElementById('case-title-display');
  const caseDescDisplay = document.getElementById('case-description-display');
  // Document elements
  const documentsListEl = document.getElementById('documents-list');
  const addDocumentForm = document.getElementById('add-document-form');
  const documentNameInput = document.getElementById('document-name');
  const documentFileInput = document.getElementById('document-file');
  // Similar cases elements
  const similarCasesListEl = document.getElementById('similar-cases-list');
  const findSimilarCasesBtn = document.getElementById('find-similar-cases-btn');
  // Evidence elements
  const evidenceListEl = document.getElementById('evidence-list');
  const addEvidenceForm = document.getElementById('add-evidence-form');
  const evidenceNameInput = document.getElementById('evidence-name');
  const evidenceFileInput = document.getElementById('evidence-file');
  // Timeline elements
  const timelineListEl = document.getElementById('timeline-list');
  const addTimelineForm = document.getElementById('add-timeline-form');
  const timelineDateInput = document.getElementById('timeline-date');
  const timelineTitleInput = document.getElementById('timeline-title');
  const timelineDescInput = document.getElementById('timeline-description');
  // FOIA elements
  const foiaListEl = document.getElementById('foia-list');
  const addFoiaForm = document.getElementById('add-foia-form');
  const foiaSubjectInput = document.getElementById('foia-subject');
  const foiaDescInput = document.getElementById('foia-description');

  /** 
   * Persist the current cases array to localStorage.
   */
  function saveCases() {
    try {
      localStorage.setItem('cases', JSON.stringify(cases));
    } catch (err) {
      console.error('Failed to save cases', err);
    }
  }

  /**
   * Find a case by its id.
   * @param {string} id
   */
  function getCaseById(id) {
    return cases.find(c => c.id === id);
  }

  /**
   * Render the list of cases into the sidebar. Each list item will attach
   * a click handler to select the case.
   */
  function renderCasesList() {
    casesListEl.innerHTML = '';
    if (cases.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No cases. Add one to get started.';
      casesListEl.appendChild(li);
      return;
    }
    cases.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c.title || 'Untitled case';
      li.dataset.caseId = c.id;
      li.addEventListener('click', () => selectCase(c.id));
      casesListEl.appendChild(li);
    });
  }

  /**
   * Select a case to view its details.
   * @param {string} caseId
   */
  function selectCase(caseId) {
    const cs = getCaseById(caseId);
    if (!cs) {
      noSelectionEl.style.display = 'block';
      caseInfoEl.classList.add('hidden');
      return;
    }
    noSelectionEl.style.display = 'none';
    caseInfoEl.classList.remove('hidden');
    caseTitleDisplay.textContent = cs.title || 'Untitled case';
    caseDescDisplay.textContent = cs.description || '';
    renderDocuments(cs);
    renderEvidence(cs);
    renderTimeline(cs);
    renderFoia(cs);
    
    // Set up similar cases functionality
    setupSimilarCases(cs);
  }

  /**
   * Set up similar cases functionality for the selected case
   * @param {object} cs
   */
  function setupSimilarCases(cs) {
    // Clear similar cases list
    similarCasesListEl.innerHTML = '';
    
    // Set up event listener for finding similar cases
    findSimilarCasesBtn.onclick = async () => {
      try {
        findSimilarCasesBtn.textContent = 'Finding similar cases...';
        findSimilarCasesBtn.disabled = true;
        
        // Call backend API to find similar cases
        const response = await fetch(`/api/cases/${cs.id}/similar`);
        
        if (!response.ok) {
          throw new Error(`Failed to find similar cases: ${response.status}`);
        }
        
        const data = await response.json();
        const similarCases = data.similarCases;
        
        renderSimilarCases(similarCases);
      } catch (error) {
        console.error('Error finding similar cases:', error);
        similarCasesListEl.innerHTML = '<li>Error finding similar cases. Please try again.</li>';
      } finally {
        findSimilarCasesBtn.textContent = 'Find Similar Cases';
        findSimilarCasesBtn.disabled = false;
      }
    };
  }

  /**
   * Render the similar cases list
   * @param {array} similarCases
   */
  function renderSimilarCases(similarCases) {
    similarCasesListEl.innerHTML = '';
    
    if (!similarCases || similarCases.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No similar cases found.';
      similarCasesListEl.appendChild(li);
      return;
    }
    
    similarCases.forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${c.title}</strong>
          <div>Similarity Score: ${Math.round(c.similarityScore * 100)}%</div>
          <div>${c.description || ''}</div>
        </div>
      `;
      similarCasesListEl.appendChild(li);
    });
  }

  /**
   * Render the documents list for the selected case.
   * @param {object} cs
   */
  function renderDocuments(cs) {
    documentsListEl.innerHTML = '';
    if (!cs.documents || cs.documents.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No documents.';
      documentsListEl.appendChild(li);
      return;
    }
    cs.documents.forEach(doc => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = doc.name;
      link.href = doc.content || '#';
      link.target = '_blank';
      if (!doc.content) {
        link.addEventListener('click', (e) => e.preventDefault());
      }
      li.appendChild(link);
      
      // Add AI analysis button if document has content
      if (doc.content) {
        const analyzeBtn = document.createElement('button');
        analyzeBtn.textContent = 'Analyze';
        analyzeBtn.className = 'analyze-btn';
        analyzeBtn.onclick = () => analyzeDocument(doc.id);
        li.appendChild(analyzeBtn);
      }
      
      documentsListEl.appendChild(li);
    });
  }

  /**
   * Render the evidence list for the selected case.
   * @param {object} cs
   */
  function renderEvidence(cs) {
    evidenceListEl.innerHTML = '';
    if (!cs.evidence || cs.evidence.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No evidence.';
      evidenceListEl.appendChild(li);
      return;
    }
    cs.evidence.forEach(ev => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = ev.name;
      link.href = ev.url || '#';
      link.target = '_blank';
      if (!ev.url) {
        link.addEventListener('click', (e) => e.preventDefault());
      }
      li.appendChild(link);
      evidenceListEl.appendChild(li);
    });
  }

  /**
   * Render the timeline events for the selected case.
   * @param {object} cs
   */
  function renderTimeline(cs) {
    timelineListEl.innerHTML = '';
    if (!cs.timeline || cs.timeline.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No timeline events.';
      timelineListEl.appendChild(li);
      return;
    }
    cs.timeline.forEach(ev => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${ev.title}</strong>
          ${ev.date ? `<div class="date">${ev.date}</div>` : ''}
          <div>${ev.description || ''}</div>
        </div>
      `;
      timelineListEl.appendChild(li);
    });
  }

  /**
   * Render the FOIA requests for the selected case.
   * @param {object} cs
   */
  function renderFoia(cs) {
    foiaListEl.innerHTML = '';
    if (!cs.foia || cs.foia.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No FOIA requests.';
      foiaListEl.appendChild(li);
      return;
    }
    cs.foia.forEach(req => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${req.subject}</strong>
          <div>${req.description || ''}</div>
          ${req.status ? `<div class="status">Status: ${req.status}</div>` : ''}
        </div>
      `;
      foiaListEl.appendChild(li);
    });
  }

  /**
   * Add a new case to the cases array.
   * @param {string} title
   * @param {string} description
   */
  function addCase(title, description) {
    const newCase = {
      id: uuid(),
      title,
      description,
      documents: [],
      evidence: [],
      timeline: [],
      foia: []
    };
    cases.push(newCase);
    saveCases();
    renderCasesList();
  }

  /**
   * Add a document to a case.
   * @param {string} caseId
   * @param {string} name
   * @param {string} content
   */
  function addDocument(caseId, name, content) {
    const cs = getCaseById(caseId);
    if (!cs) return;
    
    const newDoc = {
      id: uuid(),
      name,
      content
    };
    
    cs.documents = cs.documents || [];
    cs.documents.push(newDoc);
    saveCases();
    renderDocuments(cs);
    
    // Upload to backend for AI analysis
    try {
      fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseId: cs.id,
          name: newDoc.name,
          content: newDoc.content,
        }),
      });
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  }

  /**
   * Add evidence to a case.
   * @param {string} caseId
   * @param {string} name
   * @param {string} url
   */
  function addEvidence(caseId, name, url) {
    const cs = getCaseById(caseId);
    if (!cs) return;
    
    const newEvidence = {
      id: uuid(),
      name,
      url
    };
    
    cs.evidence = cs.evidence || [];
    cs.evidence.push(newEvidence);
    saveCases();
    renderEvidence(cs);
  }

  /**
   * Add a timeline event to a case.
   * @param {string} caseId
   * @param {string} date
   * @param {string} title
   * @param {string} description
   */
  function addTimelineEvent(caseId, date, title, description) {
    const cs = getCaseById(caseId);
    if (!cs) return;
    
    const newEvent = {
      id: uuid(),
      date,
      title,
      description
    };
    
    cs.timeline = cs.timeline || [];
    cs.timeline.push(newEvent);
    saveCases();
    renderTimeline(cs);
  }

  /**
   * Add a FOIA request to a case.
   * @param {string} caseId
   * @param {string} subject
   * @param {string} description
   */
  function addFoiaRequest(caseId, subject, description) {
    const cs = getCaseById(caseId);
    if (!cs) return;
    
    const newRequest = {
      id: uuid(),
      subject,
      description,
      status: 'Pending'
    };
    
    cs.foia = cs.foia || [];
    cs.foia.push(newRequest);
    saveCases();
    renderFoia(cs);
  }

  /**
   * Display document analysis in a modal or new section
   * @param {object} analysis
   */
  function displayDocumentAnalysis(analysis) {
    // Create a modal to display the analysis
    const modal = document.createElement('div');
    modal.className = 'analysis-modal';
    modal.innerHTML = `
      <div class="analysis-content">
        <h3>Document Analysis</h3>
        <button class="close-btn">X</button>
        <div class="analysis-section">
          <h4>Summary</h4>
          <p>${analysis.summary || 'No summary available.'}</p>
        </div>
        <div class="analysis-section">
          <h4>Key Entities</h4>
          <p>${analysis.entities || 'No entities identified.'}</p>
        </div>
        <div class="analysis-section">
          <h4>Important Dates</h4>
          <p>${analysis.dates || 'No dates identified.'}</p>
        </div>
        <div class="analysis-section">
          <h4>Legal Issues</h4>
          <p>${analysis.legalIssues || 'No legal issues identified.'}</p>
        </div>
        <div class="analysis-section">
          <h4>Potential Risks</h4>
          <p>${analysis.risks || 'No risks identified.'}</p>
        </div>
      </div>
    `;
    
    // Add close functionality
    modal.querySelector('.close-btn').onclick = () => {
      document.body.removeChild(modal);
    };
    
    // Add modal to the page
    document.body.appendChild(modal);
  }

  /**
   * Analyze a document using the backend AI service
   * @param {string} documentId
   */
  async function analyzeDocument(documentId) {
    const cs = cases.find(c => c.documents && c.documents.find(d => d.id === documentId));
    if (!cs) return;
    
    const doc = cs.documents.find(d => d.id === documentId);
    if (!doc) return;
    
    try {
      const response = await fetch(`/api/documents/${documentId}/analysis`);
      
      if (!response.ok) {
        if (response.status === 404) {
          alert('Document analysis not found. The document may still be processing.');
        } else {
          alert('Failed to retrieve document analysis.');
        }
        return;
      }
      
      const data = await response.json();
      const analysis = data.analysis;
      
      // Display analysis in a modal or new section
      displayDocumentAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing document:', error);
      alert('Error analyzing document: ' + error.message);
    }
  }

  /**
   * Search across all cases, documents, evidence, timeline events and FOIA requests.
   * @param {string} term
   */
  function search(term) {
    if (!term) {
      searchResultsEl.innerHTML = '';
      return;
    }
    
    const results = [];
    const lowerTerm = term.toLowerCase();
    
    cases.forEach(c => {
      // Search in case title and description
      if (
        (c.title && c.title.toLowerCase().includes(lowerTerm)) ||
        (c.description && c.description.toLowerCase().includes(lowerTerm))
      ) {
        results.push({
          type: 'case',
          title: c.title,
          description: c.description,
          id: c.id
        });
      }
      
      // Search in documents
      if (c.documents) {
        c.documents.forEach(doc => {
          if (
            (doc.name && doc.name.toLowerCase().includes(lowerTerm)) ||
            (doc.content && doc.content.toLowerCase().includes(lowerTerm))
          ) {
            results.push({
              type: 'document',
              title: doc.name,
              description: doc.content ? doc.content.substring(0, 100) + '...' : '',
              id: doc.id,
              caseId: c.id
            });
          }
        });
      }
      
      // Search in evidence
      if (c.evidence) {
        c.evidence.forEach(ev => {
          if (ev.name && ev.name.toLowerCase().includes(lowerTerm)) {
            results.push({
              type: 'evidence',
              title: ev.name,
              description: ev.url || '',
              id: ev.id,
              caseId: c.id
            });
          }
        });
      }
      
      // Search in timeline
      if (c.timeline) {
        c.timeline.forEach(ev => {
          if (
            (ev.title && ev.title.toLowerCase().includes(lowerTerm)) ||
            (ev.description && ev.description.toLowerCase().includes(lowerTerm)) ||
            (ev.date && ev.date.includes(term))
          ) {
            results.push({
              type: 'timeline',
              title: ev.title,
              description: ev.description,
              id: ev.id,
              caseId: c.id,
              date: ev.date
            });
          }
        });
      }
      
      // Search in FOIA requests
      if (c.foia) {
        c.foia.forEach(req => {
          if (
            (req.subject && req.subject.toLowerCase().includes(lowerTerm)) ||
            (req.description && req.description.toLowerCase().includes(lowerTerm))
          ) {
            results.push({
              type: 'foia',
              title: req.subject,
              description: req.description ? req.description.substring(0, 100) + '...' : '',
              id: req.id,
              caseId: c.id
            });
          }
        });
      }
    });
    
    renderSearchResults(results);
  }

  /**
   * Render search results into the search results list.
   * @param {array} results
   */
  function renderSearchResults(results) {
    searchResultsEl.innerHTML = '';
    
    if (results.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No results found.';
      searchResultsEl.appendChild(li);
      return;
    }
    
    results.forEach(res => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${res.title}</strong>
          <div class="type">${res.type}</div>
          <div>${res.description || ''}</div>
          ${res.date ? `<div class="date">${res.date}</div>` : ''}
        </div>
      `;
      
      // Add click handler to select the case if it's not a case itself
      if (res.type !== 'case') {
        li.addEventListener('click', () => selectCase(res.caseId));
      } else {
        li.addEventListener('click', () => selectCase(res.id));
      }
      
      searchResultsEl.appendChild(li);
    });
  }

  // Event listeners
  newCaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = caseTitleInput.value.trim();
    const description = caseDescInput.value.trim();
    if (title) {
      addCase(title, description);
      caseTitleInput.value = '';
      caseDescInput.value = '';
    }
  });

  addDocumentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCaseId = caseInfoEl.dataset.selectedCaseId;
    const name = documentNameInput.value.trim();
    const file = documentFileInput.files[0];
    if (selectedCaseId && name && file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addDocument(selectedCaseId, name, event.target.result);
        documentNameInput.value = '';
        documentFileInput.value = '';
      };
      reader.readAsText(file);
    }
  });

  addEvidenceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCaseId = caseInfoEl.dataset.selectedCaseId;
    const name = evidenceNameInput.value.trim();
    const file = evidenceFileInput.files[0];
    if (selectedCaseId && name && file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addEvidence(selectedCaseId, name, event.target.result);
        evidenceNameInput.value = '';
        evidenceFileInput.value = '';
      };
      reader.readAsDataURL(file);
    }
  });

  addTimelineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCaseId = caseInfoEl.dataset.selectedCaseId;
    const date = timelineDateInput.value;
    const title = timelineTitleInput.value.trim();
    const description = timelineDescInput.value.trim();
    if (selectedCaseId && title) {
      addTimelineEvent(selectedCaseId, date, title, description);
      timelineDateInput.value = '';
      timelineTitleInput.value = '';
      timelineDescInput.value = '';
    }
  });

  addFoiaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCaseId = caseInfoEl.dataset.selectedCaseId;
    const subject = foiaSubjectInput.value.trim();
    const description = foiaDescInput.value.trim();
    if (selectedCaseId && subject) {
      addFoiaRequest(selectedCaseId, subject, description);
      foiaSubjectInput.value = '';
      foiaDescInput.value = '';
    }
  });

  searchInputEl.addEventListener('input', (e) => {
    search(e.target.value.trim());
  });

  // Initial render
  renderCasesList();
})();