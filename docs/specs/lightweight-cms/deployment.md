# Deployment Specification

## 🚀 Deployment Architecture

### Overview
The CMS deployment follows a modern, scalable architecture optimized for performance, reliability, and cost-effectiveness using Vercel for the frontend and ConvexDB for the backend.

## 🏗️ Infrastructure Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │────│   ConvexDB      │────│  Uploadthing    │
│   (Frontend)    │    │   (Backend)     │    │  (Storage/CDN)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Vercel Analytics│
                    │  & Monitoring    │
                    └─────────────────┘
```

## 📦 Deployment Environments

### 1. Development Environment
**Purpose:** Local development and testing
**URL:** `http://localhost:3000`
**Database:** ConvexDB development instance
**Storage:** Uploadthing development environment

### 2. Staging Environment
**Purpose:** Integration testing and QA
**URL:** `https://everest-finance-staging.vercel.app`
**Database:** ConvexDB staging instance
**Storage:** Uploadthing staging environment

### 3. Production Environment
**Purpose:** Live application
**URL:** `https://everest-finance.vercel.app`
**Database:** ConvexDB production instance
**Storage:** Uploadthing production environment

## 🔧 Vercel Configuration

### vercel.json
```json
{
  "buildCommand": "bun run build",
  "devCommand": "bun run dev",
  "installCommand": "bun install",
  "framework": null,
  "functions": {
    "src/pages/api/*.ts": {
      "runtime": "@vercel/node"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/admin/publications",
      "permanent": false
    }
  ]
}
```

### Environment Variables
```bash
# .env.local (local development)
VITE_CONVEX_URL=your_convex_dev_url
UPLOADTHING_SECRET=sk_live_dev_...
UPLOADTHING_APP_ID=dev_app_id

# .env.staging (staging environment)
VITE_CONVEX_URL=your_convex_staging_url
UPLOADTHING_SECRET=sk_live_staging_...
UPLOADTHING_APP_ID=staging_app_id

# .env.production (production environment)
VITE_CONVEX_URL=your_convex_prod_url
UPLOADTHING_SECRET=sk_live_prod_...
UPLOADTHING_APP_ID=prod_app_id
```

## 🗄️ ConvexDB Deployment

### Project Setup
```bash
# Initialize ConvexDB
npx convex dev --once

# Deploy to production
npx convex deploy
```

### Environment Configuration
```javascript
// convex/deploy.ts
import { deploy } from "convex/deploy";

deploy({
  prod: {
    url: process.env.CONVEX_PROD_URL,
  },
  staging: {
    url: process.env.CONVEX_STAGING_URL,
  },
  dev: {
    url: process.env.CONVEX_DEV_URL,
  },
});
```

### Database Migrations
```typescript
// convex/migrations/001_initial_schema.ts
import { migrate } from "convex/migrations";

export default migrate(async ({ db }) => {
  // Create initial tables and indexes
  await db.createTable("publications", {
    // Table definition
  });

  await db.createIndex("publications", "by_slug", ["slug"]);
  await db.createIndex("publications", "by_category", ["category"]);
});
```

## 📸 Uploadthing Deployment

### Environment Setup
```typescript
// Different configurations for each environment
const uploadthingConfigs = {
  development: {
    apiKey: process.env.UPLOADTHING_DEV_SECRET,
    appId: process.env.UPLOADTHING_DEV_APP_ID,
  },
  staging: {
    apiKey: process.env.UPLOADTHING_STAGING_SECRET,
    appId: process.env.UPLOADTHING_STAGING_APP_ID,
  },
  production: {
    apiKey: process.env.UPLOADTHING_PROD_SECRET,
    appId: process.env.UPLOADTHING_PROD_APP_ID,
  },
};
```

### File Organization
```
uploadthing/
├── development/     # Dev environment files
├── staging/        # Staging environment files
└── production/     # Production files
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy CMS

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - name: Install dependencies
        run: bun install
      - name: Run tests
        run: bun run test
      - name: Build
        run: bun run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - name: Install dependencies
        run: bun install
      - name: Build for staging
        run: bun run build:staging
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_STAGING }}
          working-directory: ./

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - name: Install dependencies
        run: bun install
      - name: Build for production
        run: bun run build:production
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_PRODUCTION }}
          working-directory: ./
```

## 📊 Monitoring & Analytics

### Vercel Analytics
```typescript
// src/utils/analytics.ts
import { inject } from '@vercel/analytics';

export const initAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    inject();
  }
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};
```

### Error Tracking
```typescript
// src/utils/error-tracking.ts
import * as Sentry from "@sentry/react";

export const initErrorTracking = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.VERCEL_ENV || 'development',
      tracesSampleRate: 1.0,
    });
  }
};
```

### Performance Monitoring
```typescript
// src/utils/performance.ts
export const measurePerformance = (metricName: string, value: number) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Send to analytics service
    console.log(`${metricName}: ${value}`);
  }
};

export const measureWebVitals = () => {
  // Measure Core Web Vitals
  // Send to Vercel Analytics or custom service
};
```

## 🔒 Security Configuration

### Environment Security
```bash
# Generate secure secrets
openssl rand -base64 32

# Store in Vercel environment variables
# Never commit secrets to code
```

### Content Security Policy
```typescript
// src/utils/csp.ts
export const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://vercel.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://*.uploadthing.com https://*.vercel.com;
  font-src 'self' https://fonts.googleapis.com;
  connect-src 'self' https://*.convex.cloud https://*.uploadthing.com;
`.replace(/\s+/g, ' ').trim();
```

### CORS Configuration
```typescript
// src/utils/cors.ts
export const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://everest-finance.vercel.app',
    'https://everest-finance-staging.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
```

## 📈 Scaling Strategy

### Vercel Scaling
- Automatic scaling based on traffic
- Edge network for global performance
- Built-in DDoS protection
- Automatic SSL certificates

### ConvexDB Scaling
- Automatic scaling with usage
- Global database replication
- Built-in caching and optimization
- Pay-per-use pricing

### Uploadthing Scaling
- Automatic CDN scaling
- Global edge network
- Built-in optimization
- Generous free tier with clear upgrade path

## 🚨 Backup & Recovery

### Database Backup
```typescript
// convex/backup.ts
export const createBackup = mutation({
  args: {},
  handler: async (ctx) => {
    // Export all data
    const publications = await ctx.db.query("publications").collect();
    const media = await ctx.db.query("media").collect();
    const users = await ctx.db.query("users").collect();

    return {
      publications,
      media,
      users,
      timestamp: Date.now(),
    };
  },
});
```

### Automated Backups
```yaml
# Scheduled backup workflow
name: Database Backup
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run backup
        run: bun run backup
      - name: Upload backup
        uses: actions/upload-artifact@v3
        with:
          name: cms-backup
          path: backup/
```

## 🔄 Rollback Strategy

### Quick Rollback
```bash
# Rollback Vercel deployment
vercel rollback

# Rollback ConvexDB (if needed)
npx convex run rollback

# Restore from backup
bun run restore:backup
```

### Gradual Rollback
1. Deploy to staging first
2. Test critical functionality
3. Gradual traffic shift (if using advanced features)
4. Monitor error rates and performance
5. Complete rollback if issues detected

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Security scan passed
- [ ] Performance benchmarks met
- [ ] Database migrations tested
- [ ] Environment variables configured

### Deployment Steps
- [ ] Merge to target branch
- [ ] CI/CD pipeline triggered
- [ ] Staging deployment successful
- [ ] Production deployment successful
- [ ] Health checks passing
- [ ] Monitoring alerts configured

### Post-Deployment
- [ ] Functional testing completed
- [ ] Performance monitoring active
- [ ] Error tracking configured
- [ ] Team notifications sent
- [ ] Documentation updated

## 💰 Cost Optimization

### Current Costs (Estimated)
- **Vercel:** $0-20/month (hobby plan)
- **ConvexDB:** $0-10/month (free tier + usage)
- **Uploadthing:** $0-20/month (free tier + usage)
- **Total:** $0-50/month

### Cost Monitoring
```typescript
// src/utils/cost-monitoring.ts
export const trackUsage = () => {
  // Track API calls
  // Monitor file storage
  // Alert on cost thresholds
  // Generate cost reports
};
```

### Optimization Strategies
- Use Vercel's free tier effectively
- Monitor ConvexDB usage patterns
- Optimize file storage with Uploadthing
- Implement caching strategies
- Regular cost reviews

This deployment specification ensures a robust, scalable, and cost-effective CMS infrastructure that can grow with your needs.
