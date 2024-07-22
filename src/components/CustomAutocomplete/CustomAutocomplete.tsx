import * as React from 'react'
import { matchSorter } from 'match-sorter'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { CaretDownFilled } from '@ant-design/icons'
import stylesS from './CustomAutocomplete.module.scss'
import { usePopper } from 'react-popper'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CustomAutocompleteProps } from './CustomAutocomplete.interface'
import Checkbox from '../Checkbox/Checkbox'
import Input from '../Input/Input'
import SvgWrapper from '../SvgWrapper/SvgWrapper'

export default function CustomAutocomplete({
    label,
    placeholderInput,
    labels,
    primary = '',
    secondary = '',
    handleChange,
    multiple,
    type = '',
    defaultValue,
    customCheckEquality,
    isButton,
    classes,
    classesIcon,
    onlyWrapper = false,
    disabled,
    displayType = 'core',
    floatingDisplay = false,
    name = '',
    isThick = false,
}: CustomAutocompleteProps) {
    const [anchorEl, setAnchorEl] = useState<any>(null)
    const [pendingValue, setPendingValue] = useState<any>([])
    const [usedPending, setUsedPending] = useState(false)
    const [displayOptions, setDisplayOptions] = useState(labels)
    const openPopperRef = useRef<any>(null)
    const { t, i18n } = useTranslation()
    const [isPopperVisible, setPopperVisible] = useState(false)
    const [referenceElement, setReferenceElement] = useState<any>(null)
    const [popperElement, setPopperElement] = useState<any>(null)
    const [searchWord, setSearchWord] = useState<string>()

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'left-start',
        strategy: 'fixed',
        modifiers: [
            {
                name: 'scroll',
                enabled: false, // Disable scroll behavior
            },
            {
                name: 'offset',
                options: {
                    offset: isButton ? [30, -20] : [0, -320],
                },
            },
        ],
    })

    useEffect(() => {
        setDisplayOptions(labels)
    }, [labels])

    useEffect(() => {
        if (multiple == false && defaultValue == null) {
            setPendingValue([])
        } else {
            defaultValue && setPendingValue(defaultValue)
        }
    }, [defaultValue])

    const handleClick = () => {
        setPopperVisible(!isPopperVisible)
    }

    const selectAll = () => {
        if (
            displayOptions?.length > 0 &&
            displayOptions?.length != pendingValue?.length
        ) {
            setPendingValue(displayOptions)
        } else {
            setPendingValue(labels)
        }
        setUsedPending(true)
    }

    const deselectAll = () => {
        setPendingValue([])
        setUsedPending(true)
    }

    const handleSelectAllBtn = () => {
        if (pendingValue?.length === labels?.length) {
            deselectAll()
        } else {
            selectAll()
        }
    }
    const handleReset = () => {
        if (multiple == false) {
            setPendingValue(null)
            if (handleChange) {
                handleChange(null, type)
            }
        } else {
            setPendingValue([])
            if (handleChange) {
                handleChange([], type)
            }
        }
        if (anchorEl) {
            anchorEl.focus()
        }
        setUsedPending(false)
        setAnchorEl(null)
        if (displayType === 'core') {
            handleClose()
        }
    }

    const handleChangePending = (e: any, elm: any) => {
        e.stopPropagation()
        setUsedPending(true)
        if (pendingValue && pendingValue?.length > 0) {
            let tmpPending = pendingValue
            if (tmpPending?.length > 0 && !multiple) {
                tmpPending = []
            }
            const index = tmpPending.findIndex(
                (item: any) =>
                    (item?._id != null &&
                        elm?._id == null &&
                        item?._id === elm?._id) ||
                    item === elm?._id ||
                    item === elm ||
                    (customCheckEquality &&
                        customCheckEquality?.length > 0 &&
                        elm[customCheckEquality[0]] != null &&
                        item[customCheckEquality[1]] != null &&
                        elm[customCheckEquality[0]] ===
                            item[customCheckEquality[1]])
            )

            if (index !== -1) {
                const tmpVal = [...tmpPending]
                tmpVal.splice(index, 1)
                setPendingValue(tmpVal)
            } else {
                const tmpVal = [...tmpPending, elm]
                setPendingValue(tmpVal)
            }
        } else {
            setPendingValue([elm])
        }
    }

    const filterOptions = (inputValue: any) => {
        if (inputValue === null || inputValue === '') {
            setDisplayOptions(labels)
        } else {
            const tmpValue = matchSorter(
                labels,
                inputValue,
                primary ? { keys: [primary, secondary] } : {}
            )
            setDisplayOptions(tmpValue)
        }
    }
    const handleClose = () => {
        setPopperVisible(false)
        setDisplayOptions(labels)
        setPendingValue(defaultValue ? defaultValue : [])
    }

    const handleSubmit = () => {
        if (handleChange) {
            handleChange(
                !multiple ? pendingValue[0] ?? null : pendingValue,
                type
            )
        }
        if (anchorEl) {
            anchorEl.focus()
        }
        setAnchorEl(null)
        setUsedPending(false)
        setPendingValue([])
        if (displayType === 'core') {
            handleClose()
        }
    }

    const open = Boolean(anchorEl)

    const getSelected = (option: any) => {
        let defaultFlag = false
        let pendingFlag = false
        if (Array.isArray(defaultValue)) {
            for (const elm of defaultValue) {
                if (
                    typeof option !== 'object' &&
                    typeof elm !== 'object' &&
                    option === elm
                ) {
                    defaultFlag = true
                    break
                } else if (option?._id === null && elm === null) {
                    defaultFlag = true
                    break
                } else if (
                    option?._id === elm ||
                    (option?._id && elm?._id && option?._id === elm?._id)
                ) {
                    defaultFlag = true
                    break
                } else if (
                    customCheckEquality &&
                    customCheckEquality?.length > 1 &&
                    option[customCheckEquality[0]] != null &&
                    elm[customCheckEquality[1]] != null
                ) {
                    if (
                        option[customCheckEquality[0]] ===
                        elm[customCheckEquality[1]]
                    ) {
                        defaultFlag = true
                        break
                    }
                } else if (JSON.stringify(option) === JSON.stringify(elm)) {
                    pendingFlag = true
                    break
                }
            }
        } else {
            if (
                typeof option === 'object' &&
                (option?._id === defaultValue ||
                    option?._id === defaultValue?._id) &&
                defaultValue != null &&
                option?._id != null
            ) {
                defaultFlag = true
            } else if (
                JSON.stringify(option) === JSON.stringify(defaultValue) &&
                defaultValue != null &&
                option != null
            ) {
                defaultFlag = true
            }
        }
        pendingFlag = false
        if (Array.isArray(pendingValue)) {
            for (const elm of pendingValue) {
                if (
                    typeof option !== 'object' &&
                    typeof elm !== 'object' &&
                    option === elm
                ) {
                    pendingFlag = true
                    break
                } else if (option?._id === null && elm === null) {
                    pendingFlag = true
                    break
                } else if (
                    option?._id === elm ||
                    (option?._id && elm?._id && option?._id === elm?._id)
                ) {
                    pendingFlag = true
                    break
                } else if (
                    customCheckEquality &&
                    customCheckEquality?.length > 1 &&
                    option[customCheckEquality[0]] != null &&
                    elm[customCheckEquality[1]] != null
                ) {
                    if (
                        option[customCheckEquality[0]] ===
                        elm[customCheckEquality[1]]
                    ) {
                        pendingFlag = true
                        break
                    }
                } else if (JSON.stringify(option) === JSON.stringify(elm)) {
                    pendingFlag = true
                    break
                }
            }
        }
        return usedPending ? pendingFlag : defaultFlag
    }

    const id = open ? 'github-label' : undefined

    const handleDocumentClick = (event: any) => {
        if (
            popperElement &&
            !popperElement?.contains(event.target) &&
            !openPopperRef?.current?.contains(event.target)
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        if (popperElement) {
            document.addEventListener('click', handleDocumentClick)
        }
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [popperElement])

    const parentRef = useRef(null)

    const colVirtualizer = useVirtualizer({
        count: displayOptions?.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 280,
        overscan: 40,
    })

    const handleWordSearch = (event: any) => {
        setSearchWord(event?.target?.value)
        filterOptions(event.target.value)
    }
    return (
        <>
            {displayType === 'core' && (
                <div
                    className={classes && classes}
                    ref={openPopperRef}
                    style={
                        isButton || floatingDisplay
                            ? {
                                  borderBottom: '1px solid #d9d9d9',
                                  boxShadow: 'none !important',
                                  outline: 'none !important',
                              }
                            : isThick
                              ? {
                                    minWidth: 170,
                                    border: '1px solid',
                                    borderRadius: 25,
                                    paddingLeft: 5,
                                }
                              : {
                                    minWidth: 170,
                                    border: '2px solid black',
                                    borderRadius: 25,
                                    paddingLeft: 5,
                                }
                    }
                >
                    <Button
                        className={
                            floatingDisplay
                                ? stylesS.floatingButtonLabel
                                : stylesS.buttonLabel
                        }
                        disabled={disabled}
                        aria-describedby={id}
                        onClick={handleClick}
                        style={{ textTransform: 'none', paddingBottom: 0 }}
                        type="link"
                    >
                        <span
                            key={label}
                            className={
                                classes && !onlyWrapper
                                    ? classes
                                    : stylesS.labelAutocomplete
                            }
                        >
                            {label}
                        </span>
                        <CaretDownFilled
                            className={classesIcon && classesIcon}
                            style={classesIcon ? {} : { width: 25, height: 25 }}
                        />
                    </Button>
                </div>
            )}
            <div>
                {
                    <>
                        <div
                            ref={
                                displayType === 'core'
                                    ? setReferenceElement
                                    : null
                            }
                        ></div>
                        {(isPopperVisible || displayType !== 'core') && (
                            <div
                                ref={
                                    displayType === 'core'
                                        ? setPopperElement
                                        : null
                                }
                                style={
                                    displayType === 'core'
                                        ? {
                                              ...styles.popper,
                                          }
                                        : {}
                                }
                                className={
                                    displayType === 'core'
                                        ? stylesS.containerPopperCore
                                        : stylesS.containerPopper
                                }
                                id={id}
                                {...attributes.popper}
                            >
                                <div>
                                    <div className={stylesS.inputContainer}>
                                        <div
                                            className={stylesS.headerContainer}
                                        >
                                            <SvgWrapper
                                                keySvg={'searchSvg'}
                                                size={'medium'}
                                                color={'black'}
                                            />
                                            <div
                                                className={
                                                    stylesS.floatingDisplayContainer
                                                }
                                            >
                                                <Input
                                                    value={searchWord}
                                                    floatingDisplay={true}
                                                    fullWidth={true}
                                                    type={'text'}
                                                    placeholder={
                                                        placeholderInput
                                                    }
                                                    onChange={(event: any) =>
                                                        handleWordSearch(event)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={stylesS.inputContainer}>
                                        <div
                                            className={stylesS.headerContainer}
                                        >
                                            <Checkbox
                                                type={'checkbox'}
                                                title={
                                                    pendingValue?.length +
                                                    ' ' +
                                                    t('elementi selezionati')
                                                }
                                                checked={
                                                    pendingValue?.length > 0 &&
                                                    true
                                                }
                                                onClick={handleSelectAllBtn}
                                                dropdown={true}
                                                dropdownOptions={[
                                                    {
                                                        key: 0,
                                                        displayLabel:
                                                            t(
                                                                'Seleziona tutto'
                                                            ),
                                                        onClick: () =>
                                                            selectAll(),
                                                    },
                                                    {
                                                        key: 1,
                                                        displayLabel:
                                                            t(
                                                                'Deseleziona tutto'
                                                            ),
                                                        onClick: () =>
                                                            deselectAll(),
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="List"
                                        ref={parentRef}
                                        style={{
                                            width: 262,
                                            height: 550,
                                            overflow: 'auto',
                                        }}
                                    >
                                        {colVirtualizer
                                            .getVirtualItems()
                                            .map((virtualCol, index) => {
                                                const option =
                                                    displayOptions[index]
                                                const selected =
                                                    getSelected(option)
                                                return (
                                                    <li
                                                        className={
                                                            displayType ===
                                                            'core'
                                                                ? stylesS.myLiCore
                                                                : stylesS.myLi
                                                        }
                                                        key={
                                                            (option?._id
                                                                ? option?._id
                                                                : primary
                                                                  ? option[
                                                                        primary
                                                                    ]
                                                                  : option) +
                                                            selected.toString()
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                stylesS.myRow
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    stylesS.rowIcon
                                                                }
                                                            >
                                                                <Checkbox
                                                                    type={
                                                                        'checkbox'
                                                                    }
                                                                    onClick={(
                                                                        e: any
                                                                    ) => {
                                                                        handleChangePending(
                                                                            e,
                                                                            option
                                                                        )
                                                                    }}
                                                                    checked={
                                                                        pendingValue.findIndex(
                                                                            (
                                                                                item: any
                                                                            ) =>
                                                                                (item?._id !=
                                                                                    null &&
                                                                                    option?._id ==
                                                                                        null &&
                                                                                    item?._id ===
                                                                                        option?._id) ||
                                                                                item ===
                                                                                    option?._id ||
                                                                                item ===
                                                                                    option ||
                                                                                (customCheckEquality &&
                                                                                    customCheckEquality?.length >
                                                                                        0 &&
                                                                                    option[
                                                                                        customCheckEquality[0]
                                                                                    ] !=
                                                                                        null &&
                                                                                    item[
                                                                                        customCheckEquality[1]
                                                                                    ] !=
                                                                                        null &&
                                                                                    option[
                                                                                        customCheckEquality[0]
                                                                                    ] ===
                                                                                        item[
                                                                                            customCheckEquality[1]
                                                                                        ])
                                                                        ) !== -1
                                                                    }
                                                                    title={
                                                                        option[
                                                                            primary
                                                                        ]
                                                                    }
                                                                    subtitle={
                                                                        option[
                                                                            secondary
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    stylesS.divider
                                                                }
                                                            ></div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
        </>
    )
}
