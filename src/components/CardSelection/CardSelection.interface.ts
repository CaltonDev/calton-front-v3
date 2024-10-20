export const OptionsCardSelectionType = {
    standard: 'standard',
    hasWrappedComponent: 'hasWrappedComponent',
    isWrappedComponent: 'isWrappedComponent',
} as const

type WrappedComponentType =
    (typeof OptionsCardSelectionType)[keyof typeof OptionsCardSelectionType]

export const OptionsWrappedKeyType = {
    standardHours: 'standardHours',
    specialHours: 'specialHours',
    moreHours: 'moreHours',
} as const

type WrappedKeyType =
    (typeof OptionsWrappedKeyType)[keyof typeof OptionsWrappedKeyType]

export type DataType = {
    title: string
    description?: string
    wrappedKey?: WrappedKeyType
    value?: any[]
}

export interface CardSelectionProps {
    title: string
    data: DataType[]
    activeCard?: number
    setSelectedCard?: (arg0: any) => void
    addNewCard?: boolean
    wrappedComponent?: any
    hasWrappedComponent?: boolean
    isDeleteButton?: boolean
    handleDelete?: (arg0: any) => void
    type?: WrappedComponentType
}
