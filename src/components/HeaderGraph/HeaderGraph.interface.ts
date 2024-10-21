export interface HeaderGraphProps {
    title: string
    numberToShow?: number
    extraImg?: string
    dataReady?: boolean
    numberToShowComponent?: boolean
    onClickImg?: () => void
    decimals?: number
    sizeImg?: number
    textForNumber?: string | undefined
    classTextForNumber?: string | undefined
    download?: boolean
    isBubble?: boolean
    isAnt?: boolean
    option?: boolean
    setOption?: (arg0: boolean) => void
    optionable?: boolean
    isBeta?: boolean
    isInfoTooltip?: boolean
    infoTooltip?: string
}
