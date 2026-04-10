import { useEffect } from 'react';
import { InvestorProfileModal } from './InvestorProfileModal';
import { useAutoTrigger } from './useAutoTrigger';

interface AutoTriggerProfileProps {
  /** Delay in seconds before auto-triggering (default: 30) */
  delaySeconds?: number;
  /** Whether auto-trigger is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Component that automatically triggers the investor profile modal
 * after a user has been on the page for a specified time.
 * 
 * Usage: Place this component in your App or Layout component.
 * It will only trigger once per session to avoid annoying users.
 */
export const AutoTriggerProfile: React.FC<AutoTriggerProfileProps> = ({
  delaySeconds = 30,
  enabled = true,
}) => {
  const { shouldTrigger, onOpen, onClose } = useAutoTrigger({
    delaySeconds,
    enabled,
    storageKey: 'investor-profile-auto-triggered',
    oncePerSession: true,
  });

  // Mark as opened when modal is shown
  useEffect(() => {
    if (shouldTrigger) {
      onOpen();
    }
  }, [shouldTrigger, onOpen]);

  return (
    <InvestorProfileModal
      isOpen={shouldTrigger}
      onClose={onClose}
      source="auto_trigger"
    />
  );
};

export default AutoTriggerProfile;
