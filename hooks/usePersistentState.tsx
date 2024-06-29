import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePersistentState = <T,>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setState(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error('Failed to load state from AsyncStorage:', error);
      }
    };

    loadState();
  }, [key]);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state to AsyncStorage:', error);
      }
    };

    saveState();
  }, [key, state]);

  return [state, setState];
};

export default usePersistentState;
