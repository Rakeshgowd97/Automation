//1. Login API Test:

const { test, expect, request } = require('@playwright/test');

let token; // Declare token variable for further use
test('Login and extract token', async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Send POST request to login endpoint
  const response = await apiContext.post('https://easecommerce.in/api/v2/login', {
    data: {
      username: 'demouser@easecommerce.in',
      password: 'cE7iQPP^'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Ensure the request succeeded
  //expect(response.ok()).toBeTruthy();

  // Parse and log the response body
  const responseBody = await response.json();
  console.log('Login Response:', responseBody);

  // Extract the token
 token = responseBody.token;
  expect(token).toBeDefined();

  // Store or use token for future requests
  // Example: console.log or pass it to another API call
  console.log('Extracted Token:', token);
});

// 2. Warehouse API Test:

test('Use token to fetch warehouse list', async () => {
  // Ensure the token is available
  //expect(token).toBeDefined();
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYTRmTmJqSFdoN3FSQzVqZEs0ZTJNWiIsIm5hbWUiOiJGQiBUZXN0IFVzZXIifSwidXNlclR5cGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbiI6eyJpZCI6InF6ell1b3lVazl5VjFwd3VERWpLQVQifSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NDU5MTA0MTcsImV4cCI6MTc0NTk5NjgxN30.vkxSxUdGOyzGZhoH4a-Bel6Ep97JYPfWUuIV2mBglWM";
  // Create a new API request context
  const apiContext = await request.newContext();
  // Send GET request to the warehouse endpoint with the token in the headers
  const response = await apiContext.get('https://easecommerce.in/api/v2/manage/warehouse/master/list?group=default', {
    headers: {
      'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
      'Content-Type': 'application/json'
    }
  });

  // Ensure the request succeeded
  //expect(response.ok()).toBeTruthy();

  // Parse and log the response body
  const responseBody = await response.json();
  console.log('Warehouse Response:', responseBody);

  expect(Array.isArray(responseBody.warehousePickupLocation)).toBeTruthy(); // Ensure it's an array
});
//3. Negative Test Cases:

test('Test with invalid token for warehouse endpoint', async () => {
  // Define an invalid token
  const invalidToken = 'invalid_token_example';

  // Create a new API request context
  const apiContext = await request.newContext();

  // Send GET request to the warehouse endpoint with the invalid token in the headers
  const response = await apiContext.get('https://easecommerce.in/api/v2/manage/warehouse/master/all?group=default', {
    headers: {
      'Authorization': `Bearer ${invalidToken}`, // Pass the invalid token in the Authorization header
      'Content-Type': 'application/json'
    }
  });
  const responseBody = await response.json();
  console.log('Response with Invalid Token:', responseBody);
// });

test('Test with missing or incorrect query parameters', async () => {
  // Ensure the token is available
  const token="";
  expect(token).toBeDefined();

  // Create a new API request context
  const apiContext = await request.newContext();

  // Send GET request to the warehouse endpoint with missing or incorrect query parameters
  const response = await apiContext.get('https://easecommerce.in/api/v2/manage/warehouse/master/all', {
    headers: {
      'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
      'Content-Type': 'application/json'
    }
  });

  // Ensure the response status is not 200 (indicating an error)

  // Optionally, log the response body for debugging
  const responseBody = await response.json();
  console.log('Response with Missing/Incorrect Query Parameters:', responseBody);

  // Validate the error message or structure in the response
  expect(responseBody).toHaveProperty('error'); // Adjust based on actual API response
  expect(responseBody.error).toBeDefined();
});
test('Simulate no warehouses for the given group', async () => {
  // Ensure the token is available
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYTRmTmJqSFdoN3FSQzVqZEs0ZTJNWiIsIm5hbWUiOiJGQiBUZXN0IFVzZXIifSwidXNlclR5cGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbiI6eyJpZCI6InF6ell1b3lVazl5VjFwd3VERWpLQVQifSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NDU5MTA0MTcsImV4cCI6MTc0NTk5NjgxN30.vkxSxUdGOyzGZhoH4a-Bel6Ep97JYPfWUuIV2mBglWM";

  expect(token).toBeDefined();

  // Create a new API request context
  const apiContext = await request.newContext();

  // Send GET request to the warehouse endpoint with a group that has no warehouses
  const response = await apiContext.get('https://easecommerce.in/api/v2/manage/warehouse/master/all?group=nonexistent-group', {
    headers: {
      'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
      'Content-Type': 'application/json'
    }
  });

  // Ensure the request succeeded
  expect(response.ok()).toBeTruthy();

  // Parse and log the response body
  const responseBody = await response.json();
  console.log('Response for Nonexistent Group:', responseBody);

  // Validate the response for no warehouses
  expect(responseBody).toHaveProperty('warehouses'); // Adjust based on actual API response
  expect(Array.isArray(responseBody.warehouses)).toBeTruthy(); // Ensure it's an array
  expect(responseBody.warehouses.length).toBe(0); // Ensure the array is empty or validate the appropriate message
});
