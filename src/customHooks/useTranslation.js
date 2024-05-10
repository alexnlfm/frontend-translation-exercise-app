import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

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

function defaultTranslate(str) {
  return str;
}

const loadedTranslations = {};

export function useTranslation(lang, loadTranslationsFile) { 
  const [translationStrings, setTranslationStrings] = useState({});
  useEffect(() => {
    async function asyncFunc() {
      const { default: translationObj } = await loadTranslationsFile();
      setTranslationStrings(translationObj);
    };
    asyncFunc();
  }, [lang]);

  const [translationLoaded, setTranslationLoaded] = useState(false);  
  useEffect(() => {
    async function asyncFunc() {
      setTranslationLoaded(false);
      await initTranslation({ lang, translation: loadedTranslations[lang] });
      setTranslationLoaded(true);
    }

    if (isEmpty(translationStrings)) {
      return;
    }
    if (loadedTranslations[lang]) {
      loadedTranslations[lang] = {
        ...loadedTranslations[lang],
        ...translationStrings
      }
    } else {
      loadedTranslations[lang] = translationStrings;
    }
    asyncFunc();
  }, [translationStrings]);

  const { customTranslate } = global;

  return {
    t: customTranslate || defaultTranslate,
    translationLoaded
  };
}
