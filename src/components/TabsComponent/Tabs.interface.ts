import { ReactElement } from 'react'

export interface TabsProps {
    buttons: any[]
    childrenState?: (arg0: boolean) => void
    children: ReactElement[]
    externalIndex?: number[]
    block?: boolean
    setExtActiveIndex?: ((arg0: number) => void) | null
}
