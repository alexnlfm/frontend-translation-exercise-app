import i18n from 'i18next';
import { useEffect, useState } from 'react';

function defaultTranslate(str) {
  return str;
}

function initTranslation({lang, translation}) {
  return new Promise(async (resolve, reject) => {
      i18n.init({
          lng: lang,
          resources: {
              [lang]: {translation}
          }
      }, (err, t) => {
          if (err) return reject(err);

          global.customTranslate = t;
          resolve();
      });
  });
};


export function useTranslation(lang, translationStrings) {
  const [translationLoaded, setTranslationLoaded] = useState(false);

  useEffect(() => {
    async function asyncFunc() {
      setTranslationLoaded(false);
      await initTranslation({ lang, translation: translationStrings });
      setTranslationLoaded(true);
    }
    asyncFunc();
  }, [translationStrings]);

  const { customTranslate } = global;

  return {
    t: customTranslate || defaultTranslate,
    translationLoaded
  };
}
