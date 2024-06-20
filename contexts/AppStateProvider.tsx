import usePersistentState from '@/hooks/usePersistentState';
import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { Service } from 'react-native-zeroconf';

type AppState = {
  myDevices: Service[];
};

type AppStateContextType = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
};

const initialState: AppState = { myDevices: [] };

const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined,
);

const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = usePersistentState<AppState>(
    'appState',
    initialState,
  );

  return (
    <AppStateContext.Provider
      value={useMemo(() => ({ state, setState }), [setState, state])}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export { AppStateProvider, useAppState };
