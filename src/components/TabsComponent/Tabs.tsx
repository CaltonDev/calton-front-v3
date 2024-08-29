import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import './tabs.css'
import { TabsProps } from './Tabs.interface'

const Tabs = ({
    buttons,
    childrenState,
    children,
    externalIndex,
    block = false,
    setExtActiveIndex = null,
}: TabsProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const handleClick = (index: number) => {
        if (childrenState) childrenState(true)

        setActiveIndex(index)
        if (setExtActiveIndex) {
            setExtActiveIndex(index)
        }
    }
    const checkActive = (index: number, className: string) =>
        activeIndex === index ? className : ''

    useEffect(() => {
        if (externalIndex && externalIndex[1] != null) {
            setActiveIndex(externalIndex[1])
            if (setExtActiveIndex) {
                setExtActiveIndex(externalIndex[1])
            }
        }
    }, [externalIndex])

    return (
        <>
            <div className="tabsContentWrap">
                <div className="tabs">
                    {buttons.map((button, idx) => {
                        return (
                            <>
                                <Button
                                    className={`tab ${checkActive(idx, 'active')}`}
                                    onClick={() => handleClick(idx)}
                                >
                                    {checkActive(idx, 'active')
                                        ? button
                                        : button + ' > '}
                                </Button>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="panels">
                {children.map((child, idx) => {
                    return (
                        <>
                            <div
                                className={`${block ? 'panelBlock' : 'panel'} ${checkActive(idx, 'active')}`}
                            >
                                {child?.props?.children}
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Tabs
