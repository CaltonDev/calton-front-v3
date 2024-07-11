import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            it: { translation: require('./assets/locales/it_IT.json') },
            en: { translation: require('./assets/locales/en_GB.json') },
            es: { translation: require('./assets/locales/es_ES.json') },
        },
        //fallbackLng: 'en',
        react: {
            useSuspense: false,
        },
        //lng: window.localStorage.getItem('language') || "en",
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
