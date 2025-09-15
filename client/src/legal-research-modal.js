// Legal Research Modal Component
export function showLegalResearchModal(research) {
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.id = 'legal-research-modal';
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto';
  
  // Create modal header
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-4';
  
  const title = document.createElement('h2');
  title.className = 'text-xl font-bold';
  title.textContent = 'Legal Research Results';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-500 hover:text-gray-700 text-2xl';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => modal.remove();
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create modal body
  const body = document.createElement('div');
  body.className = 'space-y-6';
  
  // Research summary section
  const summarySection = document.createElement('div');
  const summaryLabel = document.createElement('h3');
  summaryLabel.className = 'font-semibold text-lg mb-2';
  summaryLabel.textContent = 'Research Summary:';
  const summaryText = document.createElement('p');
  summaryText.textContent = research.researchSummary;
  summarySection.appendChild(summaryLabel);
  summarySection.appendChild(summaryText);
  
  // Relevant cases section
  const casesSection = document.createElement('div');
  const casesLabel = document.createElement('h3');
  casesLabel.className = 'font-semibold text-lg mb-2';
  casesLabel.textContent = 'Relevant Cases:';
  const casesList = document.createElement('ul');
  casesList.className = 'space-y-3';
  
  research.relevantCases.forEach(caseItem => {
    const caseElement = document.createElement('li');
    caseElement.className = 'border-b pb-3';
    
    const caseName = document.createElement('h4');
    caseName.className = 'font-medium';
    caseName.textContent = caseItem.caseName;
    
    const citation = document.createElement('p');
    citation.className = 'text-sm text-gray-600';
    citation.textContent = caseItem.citation;
    
    const summary = document.createElement('p');
    summary.className = 'mt-1';
    summary.textContent = caseItem.summary;
    
    const relevance = document.createElement('p');
    relevance.className = 'mt-1 text-sm italic';
    relevance.textContent = `Relevance: ${caseItem.relevance}`;
    
    caseElement.appendChild(caseName);
    caseElement.appendChild(citation);
    caseElement.appendChild(summary);
    caseElement.appendChild(relevance);
    casesList.appendChild(caseElement);
  });
  
  casesSection.appendChild(casesLabel);
  casesSection.appendChild(casesList);
  
  // Relevant laws section
  const lawsSection = document.createElement('div');
  const lawsLabel = document.createElement('h3');
  lawsLabel.className = 'font-semibold text-lg mb-2';
  lawsLabel.textContent = 'Relevant Laws:';
  const lawsList = document.createElement('ul');
  lawsList.className = 'space-y-3';
  
  research.relevantLaws.forEach(lawItem => {
    const lawElement = document.createElement('li');
    lawElement.className = 'border-b pb-3';
    
    const lawName = document.createElement('h4');
    lawName.className = 'font-medium';
    lawName.textContent = lawItem.lawName;
    
    const citation = document.createElement('p');
    citation.className = 'text-sm text-gray-600';
    citation.textContent = lawItem.citation;
    
    const summary = document.createElement('p');
    summary.className = 'mt-1';
    summary.textContent = lawItem.summary;
    
    const relevance = document.createElement('p');
    relevance.className = 'mt-1 text-sm italic';
    relevance.textContent = `Relevance: ${lawItem.relevance}`;
    
    lawElement.appendChild(lawName);
    lawElement.appendChild(citation);
    lawElement.appendChild(summary);
    lawElement.appendChild(relevance);
    lawsList.appendChild(lawElement);
  });
  
  lawsSection.appendChild(lawsLabel);
  lawsSection.appendChild(lawsList);
  
  // Research strategy section
  const strategySection = document.createElement('div');
  const strategyLabel = document.createElement('h3');
  strategyLabel.className = 'font-semibold text-lg mb-2';
  strategyLabel.textContent = 'Research Strategy:';
  const strategyText = document.createElement('p');
  strategyText.textContent = research.researchStrategy;
  strategySection.appendChild(strategyLabel);
  strategySection.appendChild(strategyText);
  
  // Add sections to body
  body.appendChild(summarySection);
  body.appendChild(casesSection);
  body.appendChild(lawsSection);
  body.appendChild(strategySection);
  
  // Build modal
  modalContent.appendChild(header);
  modalContent.appendChild(body);
  modal.appendChild(modalContent);
  
  // Add to document
  document.body.appendChild(modal);
}