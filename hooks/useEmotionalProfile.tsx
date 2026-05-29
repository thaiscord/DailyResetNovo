import React, {
  createContext, useContext, useState,
  useCallback, useEffect, type ReactNode,
} from 'react';
import { getItem, setItem, StorageKeys } from './useStorage';
import { EmotionalProfile } from '../utils/emotionalProfile';

interface EmotionalProfileCtx {
  profile: EmotionalProfile | null;
  setProfile: (p: EmotionalProfile) => Promise<void>;
  loading: boolean;
}

const EmotionalProfileContext = createContext<EmotionalProfileCtx>({
  profile: null,
  setProfile: async () => {},
  loading: true,
});

export function useEmotionalProfile() {
  return useContext(EmotionalProfileContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function EmotionalProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<EmotionalProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItem<EmotionalProfile | null>(StorageKeys.EMOTIONAL_PROFILE, null).then(p => {
      setProfileState(p);
      setLoading(false);
    });
  }, []);

  const setProfile = useCallback(async (newProfile: EmotionalProfile) => {
    await setItem(StorageKeys.EMOTIONAL_PROFILE, newProfile);
    setProfileState(newProfile);
  }, []);

  return (
    <EmotionalProfileContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </EmotionalProfileContext.Provider>
  );
}
