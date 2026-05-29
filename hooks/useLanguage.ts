import React, {
  createContext, useContext, useState,
  useCallback, useEffect, type ReactNode,
} from 'react';
import { getItem, setItem, StorageKeys } from './useStorage';

export type Lang = 'en' | 'pt' | 'es' | 'fr' | 'de';

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => Promise<void>;
  t: (key: string, vars?: Record<string, string | number>) => string;
  isReady: boolean;
}

import { translations } from '../locales/translations';

function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const dict = translations[lang] as Record<string, string>;
  let str = dict[key] ?? (translations['en'] as Record<string, string>)[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
    });
  }
  return str;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: 'en',
  setLang: async () => {},
  t: (key) => key,
  isReady: false,
});

export { LanguageContext };

export function useLanguage() {
  return useContext(LanguageContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getItem<Lang>(StorageKeys.LANGUAGE, 'en').then(saved => {
      const resolved: Lang = saved ?? 'en';
      setLangState(resolved);
      require('../utils/langStore').setActiveLang(resolved);
      setIsReady(true);
      if (__DEV__) {
        console.log(`[i18n] Language loaded: ${resolved}${saved ? '' : ' (default)'}`);
      }
    });
  }, []);

  const setLang = useCallback(async (l: Lang) => {
    await setItem(StorageKeys.LANGUAGE, l);
    setLangState(l);
    require('../utils/langStore').setActiveLang(l);
    if (__DEV__) {
      console.log(`[i18n] Language set: ${l}`);
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang],
  );

  return (
    React.createElement(LanguageContext.Provider, { value: { lang, setLang, t, isReady } }, children)
  );
}
