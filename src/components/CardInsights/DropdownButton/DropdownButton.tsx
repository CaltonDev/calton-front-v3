import styles from './DropdownButton.module.scss'
import React, { useState } from 'react'
import CustomConstant from '../../../constants/CustomConstants'
import ClickAwayListener from 'react-click-away-listener'
import { DropdownButtonProps } from './DropdownButton.interface'

function DropdownButton({ config, onChange }: DropdownButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedKey, setSelectedKey] = useState(
        CustomConstant.chartType.standard
    )

    const changeType = (key: any) => {
        setSelectedKey(key)
        onChange(key)
        setIsOpen(false)
    }

    return (
        <ClickAwayListener onClickAway={() => isOpen && setIsOpen(false)}>
            <div>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={isOpen ? styles.menubtnO : styles.menubtn}
                >
                    <img
                        width={25}
                        alt={'refresh'}
                        src={
                            config.find((elm: any) => elm.key === selectedKey)
                                ?.icon
                        }
                    />
                </div>
                <div
                    className={
                        isOpen
                            ? styles.dropcontainerShow +
                              ' ' +
                              styles.dropcontainer
                            : styles.dropcontainer
                    }
                >
                    {config &&
                        config.map((elm: any, idx: number) => (
                            <div
                                key={idx}
                                onClick={() =>
                                    selectedKey !== elm.key &&
                                    changeType(elm.key)
                                }
                                className={
                                    selectedKey === elm.key
                                        ? styles.disabledItem
                                        : styles.item
                                }
                            >
                                <img width={25} src={elm.icon} /> {elm.name}
                            </div>
                        ))}
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default DropdownButton
