// Service Worker registration utility
export const registerServiceWorker = async () => {
  // Only register in production and if service workers are supported
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      // Check if there's already a service worker
      if (navigator.serviceWorker.controller) {
        console.log('✅ Service Worker already active:', navigator.serviceWorker.controller.scriptURL);
        return navigator.serviceWorker.ready;
      }

      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('✅ Service Worker registered:', registration.scope);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              console.log('🚀 New content is available and will be used when all tabs for this page are closed.');
            }
          });
        }
      });

      // Listen for service worker controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker controller changed');
        // Force a hard refresh when the new service worker takes control
        if (confirm('New content is available. Would you like to refresh the page?')) {
          window.location.reload();
        }
      });

      return registration;
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
      // Don't throw error to allow app to continue without service worker
    }
  } else if (!import.meta.env.PROD) {
    console.log('ℹ️ Service Worker not registered in development mode');
  } else {
    console.log('ℹ️ Service Worker not supported in this browser');
  }
};

// Check for updates
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
    } catch (error) {
      console.error('❌ Failed to check for updates:', error);
    }
  }
};

// Force refresh when service worker updates
export const forceRefresh = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    console.log('🔄 Forcing service worker update...');
    navigator.serviceWorker.ready.then(registration => {
      registration.update().then(() => {
        console.log('✅ Service worker updated, refreshing page...');
        window.location.reload();
      });
    });
  } else {
    window.location.reload();
  }
};
