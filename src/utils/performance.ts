// Performance monitoring utilities
export const performanceMonitor = {
  // Track component render times
  startRender: (componentName: string) => {
    const startTime = performance.now();
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`🚀 ${componentName} render time: ${duration.toFixed(2)}ms`);
        return duration;
      }
    };
  },

  // Track lazy loading performance
  trackLazyLoad: (componentName: string, startTime: number = performance.now()) => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    console.log(`📦 ${componentName} lazy load time: ${loadTime.toFixed(2)}ms`);
  },

  // Monitor Web Vitals
  reportWebVitals: (metric: any) => {
    console.log('📊 Web Vital:', metric.name, metric.value);
  },

  // Track bundle sizes (in development)
  logBundleSize: () => {
    if (process.env.NODE_ENV === 'development') {
      // This will be filled by the build process
      console.log('📦 Bundle analysis available at: dist/stats.html');
    }
  },

  // Memory usage monitoring
  logMemoryUsage: () => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      console.log('🧠 Memory Usage:', {
        used: `${(memInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memInfo.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    }
  }
};

// Performance optimization hooks
export const usePerformanceMonitor = () => {
  return {
    startRender: performanceMonitor.startRender,
    trackLazyLoad: performanceMonitor.trackLazyLoad,
    logMemoryUsage: performanceMonitor.logMemoryUsage,
  };
};
