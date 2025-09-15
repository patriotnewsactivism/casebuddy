// Timeline Prediction Modal Component
export function showTimelinePredictionModal(prediction) {
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.id = 'timeline-prediction-modal';
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto';
  
  // Create modal header
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-4';
  
  const title = document.createElement('h2');
  title.className = 'text-xl font-bold';
  title.textContent = 'Predicted Timeline Events';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-500 hover:text-gray-700 text-2xl';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => modal.remove();
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create modal body
  const body = document.createElement('div');
  body.className = 'space-y-4';
  
  // Create timeline events table
  const table = document.createElement('table');
  table.className = 'w-full border-collapse';
  
  // Table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const eventHeader = document.createElement('th');
  eventHeader.className = 'border-b py-2 text-left';
  eventHeader.textContent = 'Event';
  const dateHeader = document.createElement('th');
  dateHeader.className = 'border-b py-2 text-left';
  dateHeader.textContent = 'Predicted Date';
  const confidenceHeader = document.createElement('th');
  confidenceHeader.className = 'border-b py-2 text-left';
  confidenceHeader.textContent = 'Confidence';
  const explanationHeader = document.createElement('th');
  explanationHeader.className = 'border-b py-2 text-left';
  explanationHeader.textContent = 'Explanation';
  
  headerRow.appendChild(eventHeader);
  headerRow.appendChild(dateHeader);
  headerRow.appendChild(confidenceHeader);
  headerRow.appendChild(explanationHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Table body
  const tbody = document.createElement('tbody');
  
  prediction.events.forEach(event => {
    const row = document.createElement('tr');
    
    const eventCell = document.createElement('td');
    eventCell.className = 'border-b py-2';
    eventCell.textContent = event.event;
    
    const dateCell = document.createElement('td');
    dateCell.className = 'border-b py-2';
    dateCell.textContent = event.date;
    
    const confidenceCell = document.createElement('td');
    confidenceCell.className = 'border-b py-2';
    confidenceCell.textContent = `${event.confidence}%`;
    
    const explanationCell = document.createElement('td');
    explanationCell.className = 'border-b py-2';
    explanationCell.textContent = event.explanation;
    
    row.appendChild(eventCell);
    row.appendChild(dateCell);
    row.appendChild(confidenceCell);
    row.appendChild(explanationCell);
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  
  // Add table to body
  body.appendChild(table);
  
  // Build modal
  modalContent.appendChild(header);
  modalContent.appendChild(body);
  modal.appendChild(modalContent);
  
  // Add to document
  document.body.appendChild(modal);
}