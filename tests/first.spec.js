import { test, expect } from '@playwright/test';

// Base URL for ease of reuse
const BASE_URL = 'https://easecommerce.in/app/login';

// Credentials
const USERNAME = 'demouser@easecommerce.in';
const PASSWORD = 'cE7iQPP^';


// 1. Login Test
test('Login Test - valid credentials redirects to dashboard', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[name="username"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
});

// 2. Switch to Employee View
test('Switch to Employee View', async ({ page }) => {
  //await login(page);
  await page.click('button[aria-label="Open Settings"]');

  // Wait for the dropdown options to appear (adjust selector if needed)
  await page.waitForSelector('text="Switch to Employee"');
  
  // Click the "Switch to Employee" option
  await page.click('text="Switch to Employee"');
  await expect(page.locator('.task-list')).toBeVisible();
  const isTasksPresent = await page.locator('text=Tasks').isVisible();
  console.log(isTasksPresent);
});
//3. Task Creation
 test('Task Creation - create a new task successfully', async ({ page }) => {
  //await login(page);
//   await page.locator('button[aria-label="More options"]').click();
//   await page.getByRole('button', { name: 'Employee View' }).click();

  await page.getByRole('button', { name: 'Add Task' }).click();
  await page.fill('input[name="taskName"]', taskName);
  await page.locator('select[name="superCategory"]').selectOption({ index: 1 });
  await page.locator('select[name="subCategory"]').selectOption({ index: 1 });
  await page.locator('select[name="portals"]').selectOption({ index: 1 });
  await page.locator('select[name="products"]').selectOption({ index: 1 });
  await page.fill('input[name="taskName"]', 'RakeshQA task');
  await page.locator('select[name="assignee"]').selectOption({ index: 1 });
  await page.locator('select[name="reviewers"]').selectOption({ index: 1 });
  await page.locator('select[name="priority"]').selectOption({ index: 1 });
  await page.fill('input[name="dueDate"]', '30/04/2025');  // or today's date
  await page.fill('textarea[name="description"]', 'new qa task assigned')

  await expect(page.locator('.task-list li', { 'RakeshQA task' })).toBeVisible();
});
//4. Form Validation
test('Form Validation - submit button disabled until all required fields are filled', async ({ page }) => {
  await login(page);
  await page.locator('button[aria-label="More options"]').click();
  await page.getByRole('button', { name: 'Employee View' }).click();
  await page.getByRole('button', { name: 'Add Task' }).click();

  const submitBtn = page.getByRole('button', { name: 'Submit' });

  // Initially disabled
  await expect(submitBtn).toBeDisabled();

  // Fill only name
  await page.fill('input[name="taskName"]', 'Partial Task');
  await expect(submitBtn).toBeDisabled();

  // Fill description too
  await page.fill('textarea[name="taskDescription"]', 'Partial description');
  await expect(submitBtn).toBeEnabled();

  // Clear fields
  await page.fill('input[name="taskName"]', '');
  await page.fill('textarea[name="taskDescription"]', '');
  await expect(submitBtn).toBeDisabled();
});

// Negative Test Case
test('Negative Test Case - cannot submit with missing required fields', async ({ page }) => {
  await login(page);
  await page.locator('button[aria-label="More options"]').click();
  await page.getByRole('button', { name: 'Employee View' }).click();
  await page.getByRole('button', { name: 'Add Task' }).click();

  const submitBtn = page.getByRole('button', { name: 'Submit' });

  // Submit should stay disabled for any missing field
  await expect(submitBtn).toBeDisabled();
  await page.fill('textarea[name="taskDescription"]', 'Desc only');
  await expect(submitBtn).toBeDisabled();
  await page.fill('textarea[name="taskDescription"]', '');
  await page.fill('input[name="taskName"]', 'Name only');
  await expect(submitBtn).toBeDisabled();
});
