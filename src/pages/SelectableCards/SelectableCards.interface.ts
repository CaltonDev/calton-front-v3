import { ReactElement } from 'react'
import CSS from 'csstype'
export interface SelectableCardsProps {
    code: string
    callback: (arg0?: any) => void
}

export interface SelectableCardsItemWrapperProps {
    style?: CSS.Properties
    children: ReactElement
}
