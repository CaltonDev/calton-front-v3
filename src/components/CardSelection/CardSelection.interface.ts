export interface CardSelectionProps {
    title: string
    data: any[]
    activeCard?: number
    setSelectedCard?: (arg0: any) => void
    addNewCard?: boolean
    wrappedComponent?: any
    hasWrappedComponent?: boolean
    wrappedKey?: string
    isDeleteButton?: boolean
    handleDelete?: (arg0: any) => void
}
