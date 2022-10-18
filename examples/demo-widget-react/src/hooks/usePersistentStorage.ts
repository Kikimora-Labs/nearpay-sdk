import {useEffect, useState} from 'react';

export function usePersistentStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T>(() => {
    const valueFromStorage = persistentStorage.getItem(key);

    if (
      typeof initialValue === 'object' &&
      !Array.isArray(initialValue) &&
      initialValue !== null
    ) {
      return {
        ...initialValue,
        ...valueFromStorage,
      };
    }

    return valueFromStorage || initialValue;
  });

  useEffect(() => {
    persistentStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
interface PersistentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: any): void;
}

class LocalStorage implements PersistentStorage {
  getItem(key: string) {
    const item = localStorage.getItem(key);

    if (item === null) return undefined;

    if (item === 'null') return null;
    if (item === 'undefined') return undefined;

    try {
      return JSON.parse(item);
    } catch {}

    return item;
  }
  setItem(key: string, value: any) {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

class MockStorage implements PersistentStorage {
  getItem() {
    return null;
  }
  setItem() {}
}

export const persistentStorage = window?.localStorage
  ? new LocalStorage()
  : new MockStorage();
