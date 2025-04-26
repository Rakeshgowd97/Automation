import { Selector, ClientFunction } from 'testcafe';

// Page model
class EaseCommercePage {
    constructor() {
        // Login page
        this.usernameInput = Selector('input[name="email"]');
        this.passwordInput = Selector('input[name="password"]');
        this.loginButton   = Selector('button').withText('Login');

        // Dashboard
        this.userMenuDots  = Selector('button[aria-label="More options"]').nth(0); // triple dots
        this.employeeView  = Selector('button').withText('Employee View');

        // Employee section
        this.addTaskButton = Selector('button').withText('Add Task');
        this.taskNameInput = Selector('input[name="taskName"]');
        this.taskDescInput = Selector('textarea[name="taskDescription"]');
        this.submitButton  = Selector('button').withText('Submit');
        this.taskList      = Selector('.task-list');
    }

    async login(t, username, password) {
        await t
            .typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password)
            .click(this.loginButton);
    }

    async switchToEmployeeView(t) {
        await t
            .click(this.userMenuDots)
            .click(this.employeeView);
    }

    async createTask(t, name, description) {
        await t
            .click(this.addTaskButton)
            .typeText(this.taskNameInput, name)
            .typeText(this.taskDescInput, description)
            .click(this.submitButton);
    }
}

const page = new EaseCommercePage();
const getLocation = ClientFunction(() => document.location.href);

fixture `EaseCommerce UI Automation Tests`
    .page `https://easecommerce.in/app/login`
    .beforeEach(async t => {
        // Ensure fresh session
        await t.eval(() => localStorage.clear());
    });

// 1. Login Test
test('Login Test - valid credentials redirects to dashboard', async t => {
    await page.login(t, 'demouser@easecommerce.in', 'cE7iQPP^');

    // Verify URL changed
    await t.expect(getLocation()).contains('/dashboard', { timeout: 5000 });
});

// 2. Switch to Employee View
test('Switch to Employee View', async t => {
    await page.login(t, 'demouser@easecommerce.in', 'cE7iQPP^');
    await page.switchToEmployeeView(t);

    // Verify redirection and Task Section visible
    await t.expect(getLocation()).contains('/employee', { timeout: 5000 });
    await t.expect(page.taskList.visible).ok();
});

// 3. Task Creation
test('Task Creation - create a new task successfully', async t => {
    await page.login(t, 'demouser@easecommerce.in', 'cE7iQPP^');
    await page.switchToEmployeeView(t);

    const taskName = `Test Task ${new Date().getTime()}`;
    const taskDesc = 'This is a test task.';

    await page.createTask(t, taskName, taskDesc);

    // Verify task appears in list
    const createdTask = page.taskList.find('li').withText(taskName);
    await t.expect(createdTask.exists).ok();
});

// 4. Form Validation - positive and negative
test('Form Validation - submit button disabled until fields filled', async t => {
    await page.login(t, 'demouser@easecommerce.in', 'cE7iQPP^');
    await page.switchToEmployeeView(t);
    await t.click(page.addTaskButton);

    // Initially submit should be disabled
    await t.expect(page.submitButton.hasAttribute('disabled')).ok();

    // Fill only name
    await t.typeText(page.taskNameInput, 'Partial Task');
    await t.expect(page.submitButton.hasAttribute('disabled')).ok();

    // Fill description
    await t.typeText(page.taskDescInput, 'Partial description');
    await t.expect(page.submitButton.hasAttribute('disabled')).notOk();

    // Clear fields for negative case
    await t.selectText(page.taskNameInput).pressKey('delete');
    await t.selectText(page.taskDescInput).pressKey('delete');
    await t.expect(page.submitButton.hasAttribute('disabled')).ok();
});

// Negative Test Case
test('Negative Test Case - cannot submit form with missing required fields', async t => {
    await page.login(t, 'demouser@easecommerce.in', 'cE7iQPP^');
    await page.switchToEmployeeView(t);
    await t.click(page.addTaskButton);

    // Try submitting without any input
    await t.expect(page.submitButton.hasAttribute('disabled')).ok();

    // Fill only description
    await t.typeText(page.taskDescInput, 'Desc only');
    await t.expect(page.submitButton.hasAttribute('disabled')).ok();

    // Fill only name
    await t.selectText(page.taskDescInput).pressKey('delete');
    await t.typeText(page.taskNameInput, 'Name only');
    await t.expect(page.submitButton.hasAttribute('disabled')).ok();
});
