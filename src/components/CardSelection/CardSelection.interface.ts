type WrappedKeyType = 'standardHours' | 'specialHours' | 'moreHours'

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
}
