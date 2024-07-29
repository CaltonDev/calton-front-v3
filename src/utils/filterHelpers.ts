import moment from 'moment'
import CustomConstants from '../constants/CustomConstants'
import i18next from 'i18next'
import { AllFiltersState } from '../store/selectors/selectorsSlice'

export type FilterType = {
    text?: string
    valueText?: string
    value?: string
    mapValue?: string | null
    condition?: string
    filter?: number
    key?: string
    showCancel?: boolean
}
export const getTranslateFromGroupBy = (
    groupby: string,
    t: typeof i18next.t
) => {
    return groupby === '1d'
        ? t('1 giorno')
        : groupby === 'w'
          ? t('7 giorni')
          : groupby === 'M'
            ? t('1 mese')
            : groupby === 'Q'
              ? t('3 mesi')
              : groupby === '2Q'
                ? t('6 mesi')
                : groupby === 'Y'
                  ? t('1 anno')
                  : null
}

export const getTextFromGroupBy = (
    filters: AllFiltersState,
    t: typeof i18next.t
) => {
    return filters.Filters.groupby == '1d'
        ? t('1 giorno')
        : filters.Filters.groupby == 'w'
          ? t('7 giorni')
          : filters.Filters.groupby == 'M'
            ? t('1 mese')
            : filters.Filters.groupby == 'Q'
              ? t('3 mesi')
              : filters.Filters.groupby == '2Q'
                ? t('6 mesi')
                : filters.Filters.groupby == 'Y'
                  ? t('1 anno')
                  : null
}

const getTextFromTime = (filters: AllFiltersState, t: typeof i18next.t) => {
    const labelDate = filters.Filters.labelDate
    if (labelDate) {
        return t(labelDate)
    }
    const startDate = moment(filters.Filters.selectedTime?.startDate).format(
        'DD/MM/YYYY'
    )
    const endDate = moment(filters.Filters.selectedTime?.endDate).format(
        'DD/MM/YYYY'
    )
    return startDate && endDate
        ? t('Dal') + startDate + t('al') + endDate
        : null
}

export const getConfigFilter = (
    filters: AllFiltersState,
    t: typeof i18next.t
) => {
    return [
        {
            text: t('Raggruppa per') + ' ',
            valueText: getTextFromGroupBy(filters, t),
            value: filters.Filters.groupby,
            mapValue: null,
            condition: 'Q',
            filter: 0,
            key: 'groupby',
            showCancel: true,
        },
        {
            text: t('Fonti Feedback') + ' ',
            valueText: t('Fonti Feedback') + ': ',
            value: filters.Filters.sourceName,
            mapValue: 'name',
            condition: [],
            filter: 1,
            key: 'selectedSource',
            showCancel: true,
        },
        {
            text: t('Canali Selezionati') + ': ',
            valueText: t('Canali Selezionati') + ': ',
            value: filters.Filters.selectedChannel,
            mapValue: null,
            condition: [],
            filter: 2,
            key: 'selectedChannel',
            showCancel: true,
        },
        {
            text: '',
            valueText: getTextFromTime(filters, t),
            value: filters.Filters.selectedTime,
            mapValue: null,
            condition: null,
            filter: 3,
            key: 'selectedTime',
            showCancel: false,
        },
        {
            text: t('Luoghi Selezionati') + ': ',
            valueText: t('Luoghi Selezionati') + ': ',
            value: filters.Filters.selectedLocationDetails,
            mapValue: 'locationName',
            condition: [],
            filter: 4,
            key: 'selectedLocation',
            showCancel: true,
        },
        {
            text: t('Topic Selezionati') + ': ',
            valueText: t('Topic Selezionati') + ': ',
            value: filters.Filters.selectedTopicsDetails,
            mapValue: 'name',
            condition: [],
            filter: 5,
            key: 'selectedTopics',
            showCancel: true,
        },
        {
            text: t('Prodotti Selezionati') + ': ',
            valueText: t('Prodotti Selezionati') + ': ',
            value: filters.Filters.selectedProductsDetails,
            mapValue: 'productName',
            condition: [],
            filter: 6,
            key: 'selectedProducts',
            showCancel: true,
        },
        {
            text: t('Filtri su feedback selezionati') + ': ',
            valueText: t('Filtri su feedback selezionati') + ': ',
            value: filters.Filters.customFilters.filter(
                (elm: any) => elm._id === null
            ),
            mapValue: 'selectedCustom',
            condition: [],
            filter: 7,
            key: 'feedbackFilters',
            showCancel: true,
        },
        {
            text: '',
            valueText: '',
            value: filters?.Filters.listingLocationState,
            mapValue: 'listingLocationState',
            condition: {
                verified: {
                    yes: null,
                    no: null,
                },
                pendingVerification: {
                    yes: null,
                    no: null,
                },
                isDuplicated: {
                    yes: null,
                    no: null,
                },
                missedStoreCode: {
                    yes: null,
                    no: null,
                },
            },
            filter: 8,
            key: 'listingLocationState',
            showCancel: true,
        },
        {
            text: '',
            valueText: '',
            value: filters?.Filters.customFilters.filter(
                (elm: any) => elm.collection !== 'feedback'
            ),
            mapValue: 'selectedCustom',
            condition: [],
            filter: CustomConstants.filters.customFiltersPosition,
            key: 'customFilters',
            showCancel: true,
        },
    ]
}
