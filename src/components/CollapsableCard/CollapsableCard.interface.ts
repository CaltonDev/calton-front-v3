import { ReactElement } from 'react'

export interface CollapsableCardProps {
    headingCustomClasses?: string
    heading?: string
    colClasses?: string
    customClasses?: string
    collapsible?: boolean
    reloadable?: boolean
    closeable?: boolean
    downloadble?: boolean
    children: ReactElement | ReactElement[] | string
    isBubble?: boolean
    widthIcon?: number
    isAnt?: boolean
    optionable?: boolean
    externalSourceRefresher?: () => void
    isBeta?: boolean
    onDownload?: () => void
}
