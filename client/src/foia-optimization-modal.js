// FOIA Optimization Modal Component
export function showFOIAOptimizationModal(optimization) {
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.id = 'foia-optimization-modal';
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto';
  
  // Create modal header
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-4';
  
  const title = document.createElement('h2');
  title.className = 'text-xl font-bold';
  title.textContent = 'Optimized FOIA Request';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-500 hover:text-gray-700 text-2xl';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => modal.remove();
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create modal body
  const body = document.createElement('div');
  body.className = 'space-y-6';
  
  // Optimized request section
  const requestSection = document.createElement('div');
  const requestLabel = document.createElement('h3');
  requestLabel.className = 'font-semibold text-lg mb-2';
  requestLabel.textContent = 'Optimized Request Language:';
  const requestText = document.createElement('pre');
  requestText.className = 'bg-gray-100 p-4 rounded whitespace-pre-wrap';
  requestText.textContent = optimization.optimizedRequest;
  requestSection.appendChild(requestLabel);
  requestSection.appendChild(requestText);
  
  // Explanation section
  const explanationSection = document.createElement('div');
  const explanationLabel = document.createElement('h3');
  explanationLabel.className = 'font-semibold text-lg mb-2';
  explanationLabel.textContent = 'Explanation:';
  const explanationText = document.createElement('p');
  explanationText.textContent = optimization.explanation;
  explanationSection.appendChild(explanationLabel);
  explanationSection.appendChild(explanationText);
  
  // Key improvements section
  const improvementsSection = document.createElement('div');
  const improvementsLabel = document.createElement('h3');
  improvementsLabel.className = 'font-semibold text-lg mb-2';
  improvementsLabel.textContent = 'Key Improvements:';
  const improvementsList = document.createElement('ul');
  improvementsList.className = 'list-disc pl-5 space-y-1';
  
  optimization.keyImprovements.forEach(improvement => {
    const improvementItem = document.createElement('li');
    improvementItem.textContent = improvement;
    improvementsList.appendChild(improvementItem);
  });
  
  improvementsSection.appendChild(improvementsLabel);
  improvementsSection.appendChild(improvementsList);
  
  // Add sections to body
  body.appendChild(requestSection);
  body.appendChild(explanationSection);
  body.appendChild(improvementsSection);
  
  // Build modal
  modalContent.appendChild(header);
  modalContent.appendChild(body);
  modal.appendChild(modalContent);
  
  // Add to document
  document.body.appendChild(modal);
}