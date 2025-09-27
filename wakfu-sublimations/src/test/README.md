# Testing Documentation

This directory contains the testing infrastructure for the Wakfu Sublimations application.

## Test Structure

```
src/
├── test/
│   ├── setup.ts              # Test environment setup
│   ├── utils.tsx             # Test utilities and mock data
│   ├── utils.test.ts         # Tests for utility functions
│   ├── socketFiltering.test.ts # Tests for socket filtering logic
│   └── README.md             # This file
├── components/
│   └── __tests__/
│       ├── TableComponent.test.tsx    # Main component tests
│       └── HeaderComponent.test.tsx   # Header component tests
└── __tests__/
    └── App.test.tsx          # App component tests
```

## Running Tests

### Development Mode
```bash
npm run test
```
Runs tests in watch mode with UI.

### Run Once
```bash
npm run test:run
```
Runs all tests once and exits.

### Coverage Report
```bash
npm run test:coverage
```
Runs tests and generates coverage report.

### UI Mode
```bash
npm run test:ui
```
Runs tests with a graphical interface (requires @vitest/ui).

## Test Categories

### 1. Component Tests
- **TableComponent.test.tsx**: Tests the main data table component
  - Component rendering
  - Search functionality
  - Socket filtering
  - User interactions
  - Accessibility

- **HeaderComponent.test.tsx**: Tests the header component
  - Basic rendering
  - Structure validation

- **App.test.tsx**: Tests the main application
  - Component integration
  - Layout structure

### 2. Logic Tests
- **socketFiltering.test.ts**: Tests socket filtering algorithms
  - Pattern matching
  - Wild card handling
  - Sliding window logic
  - Real-world scenarios

- **utils.test.ts**: Tests utility functions
  - Mock data validation
  - Test helper functions

## Test Data

The tests use mock data defined in `utils.tsx`:

- **mockSublimations**: Sample sublimation data for testing
- **testSocketPatterns**: Various socket pattern combinations
- **renderWithProviders**: Custom render function for components

## Key Testing Features

### Socket Filtering Tests
Tests cover the complex socket filtering logic:
- 3-socket exact pattern matching
- 4-socket sliding window matching
- Yellow wild card handling
- Real-world equipment scenarios

### User Interaction Tests
Tests cover user interactions:
- Search input typing
- Socket filter selection
- Reset button functionality
- Keyboard navigation

### Accessibility Tests
Tests ensure the application is accessible:
- ARIA labels and roles
- Keyboard navigation
- Screen reader compatibility

## Mocking Strategy

- **Data**: Mock sublimations data to avoid external dependencies
- **Images**: Mock socket images to avoid file system dependencies
- **Components**: Mock child components in App tests to isolate testing

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the user sees and does
2. **Use Descriptive Test Names**: Clear test names that explain the scenario
3. **Test Edge Cases**: Include tests for unusual scenarios
4. **Mock External Dependencies**: Avoid testing external libraries
5. **Test Accessibility**: Ensure the app works for all users

## Adding New Tests

1. Create test file in appropriate directory
2. Import necessary testing utilities
3. Write descriptive test cases
4. Run tests to ensure they pass
5. Update this documentation if needed

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all imports use correct paths
2. **Mock Issues**: Check that mocks are properly configured
3. **Async Tests**: Use `await` for async operations
4. **Component Rendering**: Ensure components are properly wrapped

### Debug Mode
Run tests with debug output:
```bash
npm run test -- --reporter=verbose
```
