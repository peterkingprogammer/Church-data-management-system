import React, { createContext, useContext, useState } from 'react';

interface SubscriptionContextType {
  isActive: boolean;
  activateSubscription: () => void;
  deactivateSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(true); // Default to active for demo

  const activateSubscription = () => {
    setIsActive(true);
  };

  const deactivateSubscription = () => {
    setIsActive(false);
  };

  return (
    <SubscriptionContext.Provider value={{ isActive, activateSubscription, deactivateSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}