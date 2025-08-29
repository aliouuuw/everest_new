// Service Worker update handling utility
export class SWUpdateManager {
  private registration: ServiceWorkerRegistration | null = null;
  private updateAvailable = false;
  private updateListener: (() => void) | null = null;

  constructor() {
    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker controller changed');
        this.handleControllerChange();
      });

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          this.handleUpdateAvailable();
        }
      });
    }
  }

  // Initialize the update manager
  public async init(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.ready;
        this.checkForUpdates();
      } catch (error) {
        console.warn('⚠️ Failed to initialize SW update manager:', error);
      }
    }
  }

  // Check for updates
  public async checkForUpdates(): Promise<void> {
    if (!this.registration) return;

    try {
      await this.registration.update();
    } catch (error) {
      console.warn('⚠️ Failed to check for updates:', error);
    }
  }

  // Handle controller change
  private handleControllerChange(): void {
    console.log('🔄 New service worker activated');
    // Force a refresh after a short delay to ensure new service worker is ready
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // Handle update available
  private handleUpdateAvailable(): void {
    console.log('🚀 New content available');
    this.updateAvailable = true;
    
    // Notify listeners
    if (this.updateListener) {
      this.updateListener();
    }

    // Auto-refresh after 5 seconds if user doesn't interact
    setTimeout(() => {
      this.applyUpdate();
    }, 5000);
  }

  // Set update listener
  public onUpdateAvailable(callback: () => void): void {
    this.updateListener = callback;
  }

  // Apply update
  public applyUpdate(): void {
    if (this.updateAvailable) {
      console.log('🔄 Applying update...');
      window.location.reload();
    }
  }

  // Skip waiting for service worker
  public skipWaiting(): void {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }
}

// Create global instance
export const swUpdateManager = new SWUpdateManager();

// Initialize on module load
if (typeof window !== 'undefined') {
  swUpdateManager.init();
}
