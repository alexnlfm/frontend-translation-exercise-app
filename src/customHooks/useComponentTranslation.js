import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useComponentTranslation({ lang, namespace, loadTranslationsFile }) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
      async function asyncFunc() {
        const alreadyLoaded = i18n.hasResourceBundle(lang, namespace);
        if (!alreadyLoaded) {
          const { default: translationObj } = await loadTranslationsFile();
          i18n.addResourceBundle(lang, namespace, translationObj);
          publish(`${namespace}_SHOULD_RERENDER`);
        }
      }
      asyncFunc();
  }, [lang, namespace]);
  
  return { t };
}

const subscribers = {};

export function subscribe(event, callback) {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event].push(callback);
  return { unsubscribe: () => delete subscribers[event] }
}

export function publish(event) {
  const eventSubscribers = subscribers[event];
  if (eventSubscribers) {
    eventSubscribers.forEach(callback => callback());
  }
}
