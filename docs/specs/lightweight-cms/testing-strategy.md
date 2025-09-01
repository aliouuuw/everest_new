# Testing Strategy

## 🧪 Comprehensive Testing Approach

### Overview
The CMS testing strategy combines multiple testing methodologies to ensure reliability, performance, and user experience quality across the entire application.

## 📋 Testing Pyramid

```
End-to-End Tests (E2E)     ████░░  20%
Integration Tests         ████████ 40%
Unit Tests               ██████████ 40%
```

## 🧩 Testing Categories

### 1. Unit Tests

#### Component Tests
**Framework:** Vitest + React Testing Library
**Coverage Target:** 80% minimum
**Location:** `src/components/**/*.test.tsx`

**Test Examples:**
```typescript
// PublicationCard.test.tsx
import { render, screen } from "@testing-library/react";
import { PublicationCard } from "./PublicationCard";

describe("PublicationCard", () => {
  it("renders publication title", () => {
    const publication = {
      id: "1",
      title: "Test Publication",
      description: "Test description",
      category: "analyses",
      date: "2024-01-01",
    };

    render(<PublicationCard publication={publication} />);
    expect(screen.getByText("Test Publication")).toBeInTheDocument();
  });

  it("displays reading time correctly", () => {
    // Test reading time calculation
  });

  it("handles image loading errors", () => {
    // Test error states
  });
});
```

#### Hook Tests
**Framework:** Vitest + @testing-library/react-hooks
**Focus:** Custom hooks functionality

```typescript
// usePublications.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { usePublications } from "./usePublications";

describe("usePublications", () => {
  it("fetches publications on mount", async () => {
    const { result } = renderHook(() => usePublications());

    await waitFor(() => {
      expect(result.current.publications).toBeDefined();
    });
  });

  it("handles loading states", () => {
    // Test loading state
  });

  it("handles error states", () => {
    // Test error handling
  });
});
```

#### Utility Function Tests
**Framework:** Vitest
**Focus:** Pure functions and utilities

```typescript
// utils/slug.test.ts
import { generateSlug } from "./slug";

describe("generateSlug", () => {
  it("converts title to URL-friendly slug", () => {
    expect(generateSlug("Hello World!")).toBe("hello-world");
  });

  it("handles special characters", () => {
    expect(generateSlug("Café & Restaurant")).toBe("cafe-restaurant");
  });

  it("handles empty strings", () => {
    expect(generateSlug("")).toBe("");
  });
});
```

### 2. Integration Tests

#### API Integration Tests
**Framework:** Vitest + ConvexDB test utilities
**Location:** `convex/**/*.test.ts`

**Test Examples:**
```typescript
// publications.test.ts
import { describe, it, expect } from "vitest";
import { api } from "./_generated/api";

describe("Publications API", () => {
  it("creates a publication successfully", async () => {
    const publicationData = {
      title: "Test Publication",
      description: "Test description",
      content: "Test content",
      category: "analyses",
    };

    const result = await api.publications.createPublication(publicationData);

    expect(result.id).toBeDefined();
    expect(result.slug).toBe("test-publication");
  });

  it("validates required fields", async () => {
    await expect(
      api.publications.createPublication({})
    ).rejects.toThrow("Validation error");
  });

  it("enforces unique slugs", async () => {
    // Test slug uniqueness constraint
  });
});
```

#### Component Integration Tests
**Framework:** Vitest + React Testing Library
**Focus:** Component interactions and data flow

```typescript
// PublicationEditor.integration.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PublicationEditor } from "./PublicationEditor";

describe("PublicationEditor Integration", () => {
  it("saves publication to database", async () => {
    render(<PublicationEditor />);

    // Fill form
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Publication" }
    });

    // Submit form
    fireEvent.click(screen.getByText("Save"));

    // Verify database call
    await waitFor(() => {
      expect(mockCreatePublication).toHaveBeenCalledWith({
        title: "New Publication",
        // ... other fields
      });
    });
  });

  it("shows validation errors", async () => {
    // Test form validation
  });
});
```

### 3. End-to-End Tests

#### User Workflow Tests
**Framework:** Playwright
**Location:** `e2e/**/*.spec.ts`

**Test Examples:**
```typescript
// admin-workflow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Admin Publication Management", () => {
  test("admin can create and publish a publication", async ({ page }) => {
    // Login as admin
    await page.goto("/admin/login");
    await page.fill("[data-testid=email]", "admin@example.com");
    await page.fill("[data-testid=password]", "password");
    await page.click("[data-testid=login-button]");

    // Navigate to publications
    await page.click("[data-testid=publications-nav]");

    // Create new publication
    await page.click("[data-testid=create-publication]");
    await page.fill("[data-testid=title]", "E2E Test Publication");
    await page.fill("[data-testid=description]", "Test description");
    await page.selectOption("[data-testid=category]", "analyses");

    // Upload media
    await page.setInputFiles("[data-testid=file-upload]", "test-image.jpg");

    // Save and publish
    await page.click("[data-testid=save-button]");
    await page.click("[data-testid=publish-button]");

    // Verify on public site
    await page.goto("/publications");
    await expect(page.locator("text=E2E Test Publication")).toBeVisible();
  });

  test("search functionality works", async ({ page }) => {
    await page.goto("/publications");
    await page.fill("[data-testid=search-input]", "finance");

    await expect(page.locator("[data-testid=publication-card]")).toHaveCount(3);
  });
});
```

#### Critical Path Tests
- User registration and login
- Publication creation and editing
- Media upload and management
- Search and filtering
- Admin dashboard functionality

## 🔧 Testing Infrastructure

### Test Setup
```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "src/test/"],
    },
  },
});
```

### Test Utilities
```typescript
// src/test/setup.ts
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

### Mock Data
```typescript
// src/test/mocks/publications.ts
export const mockPublication = {
  id: "1",
  title: "Mock Publication",
  description: "Mock description",
  content: "Mock content",
  category: "analyses",
  status: "published",
  slug: "mock-publication",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
```

## 📊 Test Coverage Targets

| Component Type | Coverage Target | Rationale |
|----------------|----------------|-----------|
| Core Components | 90%+ | Critical user-facing features |
| Utility Functions | 100% | Pure functions, easy to test |
| Custom Hooks | 85% | Complex logic, side effects |
| API Functions | 80% | Database operations, integration |
| Error Boundaries | 95% | Critical for user experience |

## 🚀 Continuous Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - name: Install dependencies
        run: bun install
      - name: Run unit tests
        run: bun run test:unit
      - name: Run integration tests
        run: bun run test:integration
      - name: Run E2E tests
        run: bun run test:e2e
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Test Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --config vitest.unit.config.ts",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

## 🐛 Bug Tracking & Reporting

### Test Failure Classification
- **Critical:** Breaking functionality, security issues
- **High:** Major feature not working
- **Medium:** Minor issues, edge cases
- **Low:** Cosmetic issues, performance optimizations

### Automated Reporting
```typescript
// src/test/reporters/custom-reporter.ts
export class TestReporter {
  onTestFailed(test, error) {
    // Send to error tracking service
    // Create GitHub issue
    // Notify team
  }
}
```

## 📈 Performance Testing

### Load Testing
**Framework:** k6 or Artillery
```javascript
// load-test.js
import http from "k6/http";
import { check } from "k6";

export default function () {
  const response = http.get("https://your-app.com/publications");

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
}
```

### Lighthouse CI
```yaml
# lighthouse-ci.yml
ci:
  collect:
    staticDistDir: ./dist
  assert:
    assertions:
      "categories:performance": ["error", { "minScore": 0.9 }]
      "categories:accessibility": ["error", { "minScore": 0.9 }]
      "categories:best-practices": ["error", { "minScore": 0.9 }]
```

## 🔒 Security Testing

### Authentication Tests
- Session management
- Token validation
- Role-based access control
- Password security

### Input Validation Tests
- SQL injection prevention
- XSS prevention
- File upload security
- API rate limiting

### Dependency Security
```bash
# Check for vulnerabilities
bun audit

# Update dependencies
bun update

# Check for outdated packages
bun outdated
```

## 📊 Test Metrics & Reporting

### Coverage Reports
- HTML coverage reports
- JSON coverage data for CI
- Coverage trends over time
- Uncovered lines identification

### Performance Metrics
- Test execution time
- Memory usage
- API response times
- Bundle size impact

### Quality Gates
```yaml
# Quality gates in CI
- name: Quality Gate
  run: |
    # Unit test coverage > 80%
    # Integration tests pass
    # No critical security vulnerabilities
    # Bundle size < 500KB
    # Lighthouse score > 90
```

## 🎯 Test Maintenance

### Test Organization
- Tests co-located with components (`Component.test.tsx`)
- Shared test utilities in `src/test/`
- Mock data in `src/test/mocks/`
- Test configuration in `vitest.config.ts`

### Test Data Management
- Factory functions for test data
- Database seeding for integration tests
- Cleanup after each test
- Isolated test environments

### Flaky Test Management
- Retry mechanisms for unstable tests
- Separate flaky tests
- Root cause analysis
- Test environment improvements

## 🚀 Future Testing Enhancements

### Planned Improvements
- [ ] Visual regression testing (Chromatic)
- [ ] Accessibility testing (axe-core)
- [ ] API contract testing
- [ ] Chaos engineering
- [ ] Performance monitoring integration
- [ ] AI-powered test generation

### Tool Evaluation
- **Playwright vs Cypress:** Playwright for better cross-browser support
- **Vitest vs Jest:** Vitest for faster execution and better Vite integration
- **React Testing Library vs Enzyme:** RTL for better accessibility testing

This testing strategy ensures comprehensive coverage while maintaining development velocity and code quality.
