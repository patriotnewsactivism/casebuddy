// Netlify serverless function to handle API requests
export async function handler(event, context) {
  // For now, return mock data
  const path = event.path.replace('/.netlify/functions/api', '');
  
  // Handle different API endpoints
  if (path === '/cases') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        { 
          id: '1', 
          title: 'Smith v. Johnson', 
          description: 'Contract dispute case involving breach of service agreement.' 
        },
        { 
          id: '2', 
          title: 'Environmental Protection Agency Investigation', 
          description: 'Investigation into alleged violations of environmental regulations.' 
        },
        { 
          id: '3', 
          title: 'Doe Family Trust', 
          description: 'Estate planning and trust administration case.' 
        }
      ])
    };
  }
  
  // Default response for unhandled endpoints
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not Found' })
  };
}