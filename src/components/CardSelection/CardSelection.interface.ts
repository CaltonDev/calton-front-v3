export interface CardSelectionProps {
    data: any[]
    type: 'account' | 'smart_response' | 'gruppi' | 'report'
    activeCard?: number
    setSelectedCard?: (arg0: any) => void
}
