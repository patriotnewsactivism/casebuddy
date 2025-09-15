// Evidence Classification Modal Component
export function showEvidenceClassificationModal(classification) {
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.id = 'evidence-classification-modal';
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto';
  
  // Create modal header
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-4';
  
  const title = document.createElement('h2');
  title.className = 'text-xl font-bold';
  title.textContent = 'Evidence Classification';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-500 hover:text-gray-700 text-2xl';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => modal.remove();
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create modal body
  const body = document.createElement('div');
  body.className = 'space-y-4';
  
  // Evidence Type
  const typeSection = document.createElement('div');
  const typeLabel = document.createElement('h3');
  typeLabel.className = 'font-semibold';
  typeLabel.textContent = 'Evidence Type:';
  const typeValue = document.createElement('p');
  typeValue.textContent = classification.evidenceType;
  typeSection.appendChild(typeLabel);
  typeSection.appendChild(typeValue);
  
  // Confidence
  const confidenceSection = document.createElement('div');
  const confidenceLabel = document.createElement('h3');
  confidenceLabel.className = 'font-semibold';
  confidenceLabel.textContent = 'Confidence:';
  const confidenceValue = document.createElement('p');
  confidenceValue.textContent = `${classification.confidence}%`;
  confidenceSection.appendChild(confidenceLabel);
  confidenceSection.appendChild(confidenceValue);
  
  // Explanation
  const explanationSection = document.createElement('div');
  const explanationLabel = document.createElement('h3');
  explanationLabel.className = 'font-semibold';
  explanationLabel.textContent = 'Explanation:';
  const explanationValue = document.createElement('p');
  explanationValue.textContent = classification.explanation;
  explanationSection.appendChild(explanationLabel);
  explanationSection.appendChild(explanationValue);
  
  // Tags
  const tagsSection = document.createElement('div');
  const tagsLabel = document.createElement('h3');
  tagsLabel.className = 'font-semibold';
  tagsLabel.textContent = 'Suggested Tags:';
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'flex flex-wrap gap-2 mt-2';
  
  classification.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm';
    tagElement.textContent = tag;
    tagsContainer.appendChild(tagElement);
  });
  
  tagsSection.appendChild(tagsLabel);
  tagsSection.appendChild(tagsContainer);
  
  // Append all sections to body
  body.appendChild(typeSection);
  body.appendChild(confidenceSection);
  body.appendChild(explanationSection);
  body.appendChild(tagsSection);
  
  // Build modal
  modalContent.appendChild(header);
  modalContent.appendChild(body);
  modal.appendChild(modalContent);
  
  // Add to document
  document.body.appendChild(modal);
}