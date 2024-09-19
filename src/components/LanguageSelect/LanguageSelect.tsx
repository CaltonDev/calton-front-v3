import React from 'react'
import { useTranslation } from 'react-i18next'
import CaltonSelect from '../../components/Select/Select'

function LanguageSelect({ borderColor = 'white' }: { borderColor?: string }) {
    const { i18n } = useTranslation()
    const lang = i18n.language.includes('-')
        ? i18n.language.split('-')[0]
        : i18n.language

    const selectOptions = [
        {
            value: 'it',
            label: 'ITA',
            icon: 'itaFlag.svg',
        },
        {
            value: 'es',
            label: 'ES',
            icon: 'esFlag.svg',
        },
        {
            value: 'en',
            label: 'EN',
            icon: 'enFlag.svg',
        },
    ]

    const handleLanguageChange = (e: any) => {
        console.log('e: ', e)
        window.localStorage.setItem('language', e.value)
        i18n.changeLanguage(e.value)
        //todo: check in future if we need moment or days
        /*if (e.target.value === 'it') {
            moment.updateLocale('it', localization_it)
        } else if (e.target.value === 'es') {
            moment.updateLocale('es', localization_es)
        } else {
            moment.updateLocale('en', localization_en)
        }*/
    }

    return (
        <CaltonSelect
            options={selectOptions}
            value={
                selectOptions[selectOptions?.findIndex((x) => x.value === lang)]
            }
            size={'small'}
            fontSize={'small'}
            customBorderColor={borderColor}
            customColor={'white'}
            customHeight={'auto'}
            placeholderColor={'black'}
            onChange={handleLanguageChange}
            iconOnly={true}
            iconSize={'large'}
        />
    )
}

export default LanguageSelect
