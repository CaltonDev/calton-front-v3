import moment from 'moment'
import CustomConstants from '../constants/CustomConstants'
import i18next from 'i18next'
import { AllFiltersState } from '../store/selectors/selectorsSlice'
import { FiltersState } from '../store/filters/filtersSlice'

export type FilterType = {
    text?: string
    valueText?: string | null
    value?: string[] | string | ListingConditions
    mapValue?: string | null
    condition?: never[] | ListingConditions | string | null
    filter?: number
    key?: string
    showCancel?: boolean
}

type ListingConditions = {
    verified: {
        yes: boolean | null
        no: boolean | null
    }
    pendingVerification: {
        yes: boolean | null
        no: boolean | null
    }
    isDuplicated: {
        yes: boolean | null
        no: boolean | null
    }
    missedStoreCode: {
        yes: boolean | null
        no: boolean | null
    }
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
    filters: FiltersState,
    t: typeof i18next.t
) => {
    return filters?.groupby == '1d'
        ? t('1 giorno')
        : filters?.groupby == 'w'
          ? t('7 giorni')
          : filters?.groupby == 'M'
            ? t('1 mese')
            : filters?.groupby == 'Q'
              ? t('3 mesi')
              : filters?.groupby == '2Q'
                ? t('6 mesi')
                : filters?.groupby == 'Y'
                  ? t('1 anno')
                  : null
}

const getTextFromTime = (filters: FiltersState, t: typeof i18next.t) => {
    const labelDate = filters?.labelDate
    if (labelDate) {
        return t(labelDate)
    }
    const startDate = moment(filters?.startDate).format('DD/MM/YYYY')
    const endDate = moment(filters?.endDate).format('DD/MM/YYYY')
    return startDate && endDate
        ? t('Dal') + startDate + t('al') + endDate
        : null
}

export const getConfigFilter = (
    filters: FiltersState,
    t: typeof i18next.t
): FilterType[] => {
    return [
        {
            text: t('Raggruppa per') + ' ',
            valueText: getTextFromGroupBy(filters, t),
            value: filters?.groupby,
            mapValue: null,
            condition: 'Q',
            filter: 0,
            key: 'groupby',
            showCancel: true,
        },
        {
            text: t('Fonti') + ' ',
            valueText: t('Fonti') + ': ',
            value: filters?.sourceName,
            mapValue: 'name',
            condition: [],
            filter: 1,
            key: 'selectedSource',
            showCancel: true,
        },
        {
            text: t('Canali') + ': ',
            valueText: t('Canali') + ': ',
            value: filters?.selectedChannel,
            mapValue: null,
            condition: [],
            filter: 2,
            key: 'selectedChannel',
            showCancel: true,
        },
        {
            text: '',
            valueText: getTextFromTime(filters, t),
            value: filters?.selectedTime,
            mapValue: null,
            condition: null,
            filter: 3,
            key: 'selectedTime',
            showCancel: false,
        },
        {
            text: t('Luoghi') + ': ',
            valueText: t('Luoghi') + ': ',
            value: filters?.selectedLocationDetails,
            mapValue: 'locationName',
            condition: [],
            filter: 4,
            key: 'selectedLocation',
            showCancel: true,
        },
        {
            text: t('Topic') + ': ',
            valueText: t('Topic') + ': ',
            value: filters?.selectedTopicsDetails,
            mapValue: 'name',
            condition: [],
            filter: 5,
            key: 'selectedTopics',
            showCancel: true,
        },
        {
            text: t('Prodotti') + ': ',
            valueText: t('Prodotti') + ': ',
            value: filters?.selectedProductsDetails,
            mapValue: 'productName',
            condition: [],
            filter: 6,
            key: 'selectedProducts',
            showCancel: true,
        },
        {
            text: t('Custom') + ': ',
            valueText: t('Custom') + ': ',
            value: filters?.customFilters.filter(
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
            value: filters?.listingLocationState,
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
            value: filters?.customFilters.filter(
                (elm: any) => elm.collection !== 'feedback'
            ),
            mapValue: 'selectedCustom',
            condition: [],
            filter: CustomConstants.filters?.customFiltersPosition,
            key: 'customFilters',
            showCancel: true,
        },
    ]
}
