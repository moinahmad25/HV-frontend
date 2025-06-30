// API configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://hv-backend.onrender.com' 
  : '/api';

// Create a generic API function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  console.log('Making request to:', url);
  console.log('Request config:', config);

  try {
    const response = await fetch(url, config);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Specific login function
export const loginUser = async (registrationData) => {
  return apiRequest('/api/form/login', {
    method: 'POST',
    body: JSON.stringify(registrationData),
  });
};