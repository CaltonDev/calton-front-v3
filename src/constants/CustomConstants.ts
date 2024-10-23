import { Views } from 'react-big-calendar'

export interface ViewOption {
    id: string
    label: string
    labelBig: string
}

export interface PostType {
    displayName: string
    labelValue: string
    label: string
    value: string
    title: string
    subtitle: string
}

export interface BtnType {
    value: string
    label: string
}

export interface CustomConstantsType {
    platformType: {
        reviews: string
        surveys: string
    }
    chartType: {
        standard: number
        absolute: number
        mean: number
        distribution: number
    }
    filters: {
        customFiltersPosition: number
    }
    modalAddIntegration: {
        [key: string]: number
    }
    labelAnt: {
        position: string
        offsetY: number
        offsetX: number
        style: {
            fontSize: number
            fontWeight: string
            fill: string
        }
    }
}

export interface EditType {
    [key: string]: number
}

export interface Sentiment {
    key: string
    value: number
    label: string
}

export interface MockEditOthersOption {
    labels: {
        displayName: string
    }
    value: boolean
}

export interface MockEditOthersItem {
    labels: {
        displayName: string
        description?: string
    }
    options: MockEditOthersOption[]
}

export interface VerifyListingOption {
    label: string
    value: string
}

export const VIEW_OPTIONS: ViewOption[] = [
    { id: Views.DAY, label: 'Giorno', labelBig: 'day' },
    { id: Views.WEEK, label: 'Settimana', labelBig: 'week' },
    { id: Views.MONTH, label: 'Mese', labelBig: 'month' },
]

export const postTypes: PostType[] = [
    {
        displayName: 'Crea aggiornamento',
        label: 'Crea aggiornamento',
        labelValue: 'Post',
        value: 'STANDARD',
        title: 'Aggiungi aggiornamento',
        subtitle: 'Pubblica aggiornamenti per i tuoi clienti su Google',
    },
    {
        displayName: 'Crea offerta',
        label: 'Crea offerta',
        labelValue: 'Offerta',
        value: 'OFFER',
        title: 'Aggiungi offerta',
        subtitle:
            "Crea un'offerta per attirare i clienti verso la tua attività",
    },
    {
        displayName: 'Crea evento',
        label: 'Crea evento',
        labelValue: 'Evento',
        value: 'EVENT',
        title: 'Aggiungi evento',
        subtitle: 'Informa i clienti sugli eventi organizzati da te',
    },
]

export const btnTypesList: BtnType[] = [
    {
        value: 'ACTION_TYPE_UNSPECIFIED',
        label: 'Nessuno',
    },
    {
        value: 'BOOK',
        label: 'Prenota',
    },
    {
        value: 'ORDER',
        label: 'Ordina',
    },
    {
        value: 'SHOP',
        label: 'Catalogo prodotti',
    },
    {
        value: 'LEARN_MORE',
        label: 'Scopri di più',
    },
    {
        value: 'SIGN_UP',
        label: 'Registrati',
    },
    {
        value: 'CALL',
        label: 'Chiama',
    },
]

export const CustomConstants: CustomConstantsType = {
    platformType: {
        reviews: 'reviews',
        surveys: 'surveys',
    },
    chartType: {
        standard: 0,
        absolute: 1,
        mean: 2,
        distribution: 3,
    },
    filters: {
        customFiltersPosition: 9,
    },
    modalAddIntegration: {
        tripadvisor: 0,
        thefork: 1,
        trustpilot: 2,
        googlemybusiness: 3,
        'upload file': 4,
        indeed: 5,
        amazon: 6,
        justeat: 7,
        'trusted shops': 8,
    },
    labelAnt: {
        position: 'left',
        offsetY: -7,
        offsetX: -2,
        style: {
            fontSize: 12, // Font size of the labels
            fontWeight: 'bold',
            fill: '#464D69',
        },
    },
}

export const editType: EditType = {
    all: 0,
    title: 1,
    primaryCategory: 2,
    description: 3,
    phone: 4,
    website: 5,
    additionalPhones: 6,
    address: 7,
    area: 8,
    storeCode: 9,
}

export const sents: Sentiment[] = [
    { key: 'negative', value: -1, label: 'Negativo' },
    { key: 'neutral', value: 0, label: 'Neutro' },
    { key: 'positive', value: 1, label: 'Positivo' },
]

export const MockEditOthersList: MockEditOthersItem[] = [
    {
        labels: {
            displayName: 'Dall’attività',
        },
        options: [
            {
                labels: {
                    displayName: 'Caratteristiche: di proprietà di donne',
                },
                value: true,
            },
        ],
    },
    {
        labels: {
            displayName: 'Accessibilità',
        },
        options: [
            {
                labels: {
                    displayName: 'Ha un bagno accessibile in sedia a rotelle',
                },
                value: false,
            },
            {
                labels: {
                    displayName:
                        'Dispone di tavoli accessibili in sedia a rotelle',
                },
                value: false,
            },
        ],
    },
    {
        labels: {
            displayName: 'Assistenza per emergenza',
        },
        options: [
            {
                labels: {
                    displayName: 'Assume profughi',
                },
                value: false,
            },
        ],
    },
    {
        labels: {
            displayName: 'Frequentazione',
        },
        options: [
            {
                labels: {
                    displayName: 'LGBTQ+ friendly',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'È un luogo sicuro per transgender',
                },
                value: false,
            },
        ],
    },
    {
        labels: {
            displayName: 'Opzioni di servizio',
            description: 'Assistenza in altre lingue.',
        },
        options: [
            {
                labels: {
                    displayName: 'Arabo',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Cantonese',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Coreano',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Creolo haitiano',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Filippino',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Francese',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Hindi',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Inglese',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Italiano',
                },
                value: true,
            },
            {
                labels: {
                    displayName: 'Lingua dei segni americana (ASL)',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Mandarino',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Polacco',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Portoghese',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Rumeno',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Russo',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Spagnolo',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Tedesco',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Ucraino',
                },
                value: false,
            },
            {
                labels: {
                    displayName: 'Vietnamita',
                },
                value: false,
            },
        ],
    },
    {
        labels: {
            displayName: 'Servizi',
        },
        options: [
            {
                labels: {
                    displayName: 'Dispone di bagno gender-neutral',
                },
                value: false,
            },
        ],
    },
]

export const verifyListingObj = (
    t: (key: string) => string
): VerifyListingOption[] => {
    return [
        {
            label: 'EMAIL',
            value: t('Email'),
        },
        {
            label: 'PHONE_CALL',
            value: t('Telefono'),
        },
        {
            label: 'ADDRESS',
            value: t('Indirizzo'),
        },
        {
            label: 'AUTO',
            value: t('Auto'),
        },
    ]
}

export const listingStateObj = {
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
}

export const weekdaysConstant = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
] as const

export type Weekdays = (typeof weekdaysConstant)[number]

export const regularHoursBooleans = {
    OPEN: '1',
    OPEN_FOR_BUSINESS_UNSPECIFIED: '2',
    CLOSED_TEMPORARILY: '3',
    CLOSED_PERMANENTLY: '4',
}

export default CustomConstants
