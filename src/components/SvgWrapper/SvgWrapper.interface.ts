import * as React from 'react'

export type SvgKeyType =
    | 'arrowBack'
    | 'arrowForward'
    | 'lockOpenedSvg'
    | 'lockClosedSvg'
    | 'searchSvg'
    | 'arrowDownSvg'
    | 'settingsSvg'
    | 'profileSvg'
    | 'caltonLogoSvg'
    | 'home.svg'
    | 'reviews.svg'
    | 'location.svg'
    | 'products.svg'
    | 'Topic.svg'
    | 'Grafo.svg'
    | 'analisi-avanzata.svg'
    | 'chatIcon.svg'
    | 'communicationIcon.svg'
    | 'raggruppa.svg'
    | 'others.svg'
    | 'topic.svg'
    | 'channels.svg'
    | 'tempo.svg'
    | 'customFilters.svg'
    | 'Amazon.svg'
    | 'Facebook.svg'
    | 'GoogleMyBusiness.svg'
    | 'Google.svg'
    | 'Trustpilot.svg'
    | 'Trusted shops.svg'
    | 'TripadvisorAPI.svg'
    | 'JustEat.svg'
    | 'TheFork.svg'
    | 'close.svg'
    | 'expand.svg'
    | 'menu.svg'
    | 'hours.svg'
    | 'photo.svg'
    | 'localPost.svg'
    | 'performance.svg'
    | 'sondaggi.svg'
    | 'openInNewPageIcon.svg'
    | 'message.svg'
    | 'reply.svg'
    | 'negativeSentiment.svg'
    | 'neutralSentiment.svg'
    | 'positiveSentiment.svg'
    | 'sendIcon.svg'
    | 'rowSelection.svg'
    | 'highlighter.svg'
    | 'burgerIconDot.svg'
    | 'star'
    | 'radioSentiment.svg'
    | 'itaFlag.svg'
    | 'esFlag.svg'
    | 'enFlag.svg'
    | 'plusIcon'
    | 'trashIcon'
    | 'copyIcon'
    | 'shareIcon'
    | 'editIcon'
    | 'uploadSvg'
    | 'infoIconSvg'
    | 'questionIconSvg'
    | 'surveyIconSvg'
    | 'checkmarkSvg'
    | 'peopleSvg'
    | 'eyeSvg'
    | 'xIcon'

export interface SvgWrapperProps {
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    color?:
        | 'primary'
        | 'secondary'
        | 'disabled'
        | 'primaryIcon'
        | 'white'
        | 'black'
    isClickable?: boolean
    hasContainerProps?: {
        hasContainer: boolean
        containerSize: number
        background?: string
        border?: string
        outlined?: boolean
        borderRadius?: number
    }
    customWidth?: number
    customHeight?: number
    customColor?: string
    svgBackgroundColor?: string | null
    onClick?: React.MouseEventHandler<HTMLDivElement>
    disabled?: boolean
    keySvg: SvgKeyType | string
}

export interface SvgProps {
    width?: number
    height?: number
    fillColor?: string
    svgBackgroundColor?: string | null
}
