// Service Worker registration utility
export const registerServiceWorker = async () => {
  // Only register in production and if service workers are supported
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
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

      return registration;
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
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
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
  }
};
