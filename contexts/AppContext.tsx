
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Toast, ToastType } from '../components/Toast';

interface AppContextType {
  showToast: (message: string, type: ToastType) => void;
  triggerReKey: () => Promise<void>;
  hasApiKey: boolean;
  setHasApiKey: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{message: string, type: ToastType} | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Initial check
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      }
    };
    checkKey();
  }, []);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const triggerReKey = async () => {
    try {
        if (window.aistudio?.openSelectKey) {
            await window.aistudio.openSelectKey();
            if (window.aistudio.hasSelectedApiKey) {
            const has = await window.aistudio.hasSelectedApiKey();
            setHasApiKey(has);
            if(has) {
                showToast("API Key updated successfully. Pro Tier Active.", 'success');
            }
            }
        }
    } catch (error) {
        showToast("Failed to open key selector", 'error');
    }
  };

  return (
    <AppContext.Provider value={{ showToast, triggerReKey, hasApiKey, setHasApiKey }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
