import { useEffect, useState, useCallback } from 'react';

interface UseAutoTriggerOptions {
  /** Delay in seconds before triggering */
  delaySeconds?: number;
  /** Whether auto-trigger is enabled */
  enabled?: boolean;
  /** Cookie/storage key to prevent re-triggering */
  storageKey?: string;
  /** Whether to only trigger once per session */
  oncePerSession?: boolean;
}

export function useAutoTrigger({
  delaySeconds = 30,
  enabled = true,
  storageKey = 'investor-profile-triggered',
  oncePerSession = true,
}: UseAutoTriggerOptions) {
  const [shouldTrigger, setShouldTrigger] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const markTriggered = useCallback(() => {
    setHasTriggered(true);
    if (oncePerSession) {
      try {
        sessionStorage.setItem(storageKey, Date.now().toString());
      } catch {
        // Ignore storage errors
      }
    }
  }, [storageKey, oncePerSession]);

  const resetTrigger = useCallback(() => {
    setShouldTrigger(false);
    setHasTriggered(false);
    if (oncePerSession) {
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        // Ignore storage errors
      }
    }
  }, [storageKey, oncePerSession]);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    // Check if already triggered in this session
    if (oncePerSession) {
      try {
        const triggered = sessionStorage.getItem(storageKey);
        if (triggered) {
          setHasTriggered(true);
          return;
        }
      } catch {
        // Ignore storage errors
      }
    }

    // Wait for delay before triggering
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setShouldTrigger(true);
      }
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds, enabled, hasTriggered, oncePerSession, storageKey]);

  const handleOpen = useCallback(() => {
    markTriggered();
    setShouldTrigger(false);
  }, [markTriggered]);

  const handleClose = useCallback(() => {
    markTriggered();
    setShouldTrigger(false);
  }, [markTriggered]);

  return {
    shouldTrigger,
    hasTriggered,
    onOpen: handleOpen,
    onClose: handleClose,
    resetTrigger,
  };
}

export default useAutoTrigger;
