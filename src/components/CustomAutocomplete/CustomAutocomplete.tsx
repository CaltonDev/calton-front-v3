import * as React from 'react'
import { matchSorter } from 'match-sorter'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import stylesS from './CustomAutocomplete.module.scss'
import { usePopper } from 'react-popper'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CustomAutocompleteProps } from './CustomAutocomplete.interface'
import Checkbox from '../Checkbox/Checkbox'
import Input from '../Input/Input'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'

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
    disabled,
    displayType = 'core',
    floatingDisplay = false,
    isThick = false,
    hasDropdown = false,
    applySelection,
    hasIcons = false,
    fullwidth = false,
    isFromReview,
}: CustomAutocompleteProps) {
    const [anchorEl, setAnchorEl] = useState<any>(null)
    const [pendingValue, setPendingValue] = useState<any>(
        defaultValue ? defaultValue : []
    )
    const [usedPending, setUsedPending] = useState(false)
    const [displayOptions, setDisplayOptions] = useState(labels)
    const openPopperRef = useRef<any>(null)
    const { t } = useTranslation()
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
                    offset: isButton ? [30, -20] : [10, -500],
                },
            },
        ],
    })

    useEffect(() => {
        setDisplayOptions(labels)
    }, [labels])

    /*useEffect(() => {
        if (multiple == false && defaultValue == null) {
            setPendingValue([])
        } else {
            defaultValue && setPendingValue(defaultValue)
        }
    }, [defaultValue])*/

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

            //TODO: change within the backend so we always have _id
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
                if (tmpPending?.length > 0 && !multiple) {
                    tmpPending = []
                }
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
        //rimosso state update
        //setPendingValue(defaultValue ? defaultValue : [])
    }

    useEffect(() => {
        if (handleChange) {
            handleChange(
                !multiple ? (pendingValue[0] ?? null) : pendingValue,
                type
            )
        }
    }, [pendingValue])

    //todo: we should call this handle submit from the parent
    const handleSubmit = () => {
        if (handleChange) {
            handleChange(
                !multiple ? (pendingValue[0] ?? null) : pendingValue,
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
        estimateSize: () => 100,
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
                        isFromReview
                            ? {
                                  border: '1px solid #9D96A5',
                                  boxShadow: 'none !important',
                                  outline: 'none !important',
                                  borderRadius: 10,
                                  minWidth: 170,
                                  minHeight: 30,
                              }
                            : isButton || floatingDisplay
                              ? {
                                    border: '1px solid #9D96A5',
                                    boxShadow: 'none !important',
                                    outline: 'none !important',
                                    borderRadius: 10,
                                    minWidth: 170,
                                    minHeight: 36,
                                }
                              : isThick
                                ? {
                                      minWidth: 170,
                                      border: '1px solid',
                                      borderRadius: 25,
                                      paddingLeft: 5,
                                  }
                                : fullwidth
                                  ? {
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        gap: '9px',
                                        width: '100%',
                                        background: '#FFFFFF',
                                        border: '1px solid #9D96A5',
                                        borderRadius: '10px',
                                        fontFamily: 'Roboto',
                                        minWidth: 400,
                                    }
                                  : {
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        gap: '9px',
                                        width: '100%',
                                        background: '#FFFFFF',
                                        border: '1px solid #9D96A5',
                                        borderRadius: '10px',
                                        fontFamily: 'Roboto',
                                        minWidth: 400,
                                        maxWidth: 500,
                                    }
                    }
                >
                    <Button
                        variant={'outline'}
                        size={'small'}
                        className={
                            isButton || floatingDisplay
                                ? stylesS.floatingButtonLabel
                                : stylesS.buttonLabel
                        }
                        disabled={disabled}
                        customHeight={isFromReview ? 30 : undefined}
                        aria-describedby={id}
                        onClick={handleClick}
                        icon={'arrowDownSvg'}
                        arrowPlacement={'right'}
                    >
                        {label}
                    </Button>
                </div>
            )}
            <div style={{ width: '100%' }}>
                {
                    <>
                        {displayType === 'core' && (
                            <div
                                ref={
                                    displayType === 'core'
                                        ? setReferenceElement
                                        : null
                                }
                            ></div>
                        )}
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
                                        : displayType === 'filter'
                                          ? stylesS.containerPopperFilter
                                          : stylesS.containerPopper
                                }
                                id={id}
                                {...attributes.popper}
                            >
                                <div>
                                    {displayType === 'filter' ? (
                                        <div className={stylesS.inputContainer}>
                                            <div
                                                className={
                                                    stylesS.headerContainer
                                                }
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
                                                        onChange={(
                                                            event: any
                                                        ) =>
                                                            handleWordSearch(
                                                                event
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className={
                                                stylesS.inputCustomAutocompleteHeader
                                            }
                                        ></div>
                                    )}
                                    {multiple && (
                                        <div
                                            className={
                                                displayType === 'filter'
                                                    ? stylesS.inputContainerFilter
                                                    : stylesS.inputContainer
                                            }
                                        >
                                            <div
                                                className={
                                                    stylesS.headerContainer
                                                }
                                            >
                                                <Checkbox
                                                    type={'checkbox'}
                                                    title={
                                                        pendingValue?.length +
                                                        ' ' +
                                                        t(
                                                            'elementi selezionati'
                                                        )
                                                    }
                                                    checked={
                                                        pendingValue?.length >
                                                            0 && true
                                                    }
                                                    onClick={handleSelectAllBtn}
                                                    dropdown={hasDropdown}
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
                                                {displayType !== 'filter' && (
                                                    <div
                                                        className={
                                                            stylesS.headerBtnContainer
                                                        }
                                                    >
                                                        <Button
                                                            size={'small'}
                                                            variant={'ghost'}
                                                            onClick={
                                                                handleReset
                                                            }
                                                        >
                                                            {t('Reset')}
                                                        </Button>
                                                        <Button
                                                            size={'small'}
                                                            onClick={
                                                                handleSubmit
                                                            }
                                                        >
                                                            {t('Applica')}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className="List"
                                        ref={parentRef}
                                        style={{
                                            width: '100%',
                                            height: '100%',
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
                                                console.log({ selected })
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
                                                                onClick={(
                                                                    e: any
                                                                ) => {
                                                                    handleChangePending(
                                                                        e,
                                                                        option
                                                                    )
                                                                }}
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
                                                                    hasIcon={
                                                                        hasIcons
                                                                            ? `${option}.svg`
                                                                            : ''
                                                                    }
                                                                    checked={
                                                                        selected
                                                                    }
                                                                    title={
                                                                        primary !==
                                                                        ''
                                                                            ? option[
                                                                                  primary
                                                                              ]
                                                                            : option
                                                                    }
                                                                    subtitle={
                                                                        Array.isArray(
                                                                            option[
                                                                                secondary
                                                                            ]
                                                                        )
                                                                            ? option[
                                                                                  secondary
                                                                              ].join(
                                                                                  ', '
                                                                              )
                                                                            : option[
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
                                    {applySelection && (
                                        <div
                                            className={stylesS.footerContainer}
                                        >
                                            <Button
                                                size={'small'}
                                                disabled={false}
                                                onClick={applySelection}
                                            >
                                                {t('Applica')}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
        </>
    )
}
