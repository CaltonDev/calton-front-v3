import styles from './Dropdown.module.scss'
import { DropdownProps } from './Dropdown.interface'
import React, { useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'
import Typography from '../Typography/Typography'
import Hooks from '../../utils/hooks/Hooks'

const Dropdown = ({
    isButton = false,
    btnTitle = '',
    dropdownData,
}: DropdownProps) => {
    const [openDropdown, setOpenDropdown] = useState(false)

    const handleClickOutside = () => {
        setOpenDropdown(false)
    }

    const ref = Hooks.useOutsideClick(handleClickOutside)

    return (
        <div className={styles.container}>
            {isButton ? (
                <Button
                    variant={'outline'}
                    size={'small'}
                    arrowPlacement={'right'}
                    icon={'arrowDownSvg'}
                    iconColor={'secondary'}
                    onClick={() => setOpenDropdown(!openDropdown)}
                >
                    {btnTitle}
                </Button>
            ) : (
                <SvgWrapper
                    keySvg={'burgerIconDot.svg'}
                    size={'small'}
                    onClick={() => setOpenDropdown(!openDropdown)}
                />
            )}
            {openDropdown && (
                <div
                    ref={ref}
                    className={
                        isButton ? styles.dropdownMenuBtn : styles.dropdownMenu
                    }
                >
                    {dropdownData?.map((obj: any, idx: number) => (
                        <div
                            key={idx}
                            className={styles.dropdownTextLine}
                            onClick={obj?.onClickAction}
                        >
                            <SvgWrapper
                                keySvg={obj?.labelIcon}
                                size={'small'}
                                customColor={obj?.labelColor}
                            />
                            <Typography
                                size={'bodyMedium'}
                                weight={'normal'}
                                color={obj?.labelColor}
                            >
                                {obj?.label}
                            </Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
