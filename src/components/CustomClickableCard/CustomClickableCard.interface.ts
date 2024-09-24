import { ReactElement } from 'react'

export interface CustomClickableCardProps {
    children?: ReactElement
    heading: string
    content?: string
    footer?: string
    img?: string
    isSelectable?: boolean
    styleRow?: any
    likes?: number
    followers?: number
    rating_count?: number
    isDisabled?: boolean
    onClick: (arg0?: any) => void
    duplicate?: boolean
    hiddenField?: string
    selectedCardIndex?: any[]
    index: number
    allSelected?: boolean
}
