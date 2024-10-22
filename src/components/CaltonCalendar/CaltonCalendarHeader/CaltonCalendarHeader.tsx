import styles from './CaltonCalendarHeader.module.scss'
import { Button, Select } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
    StyledMenu,
    StyledSelect,
} from '../../ListingEdit/AdditionalCategorySelect/AdditionalCategorySelectStyled'
import { VIEW_OPTIONS } from '../../../constants/CustomConstants'
import { useTranslation } from 'react-i18next'
import moment from 'moment/moment'
import { Views } from 'react-big-calendar'
import { views } from 'react-big-calendar/lib/utils/constants'
import { debounce } from 'lodash'
import { CaltonCalendarHeaderProps } from './CaltonCalendarHeader.interface'

const adjustDate = (startDate: Date, amount: number, view: string) => {
    return moment(startDate)
        .add(amount, view === Views.DAY ? 'd' : view === Views.WEEK ? 'w' : 'M')
        .toDate()
}

const formatDate = (startDate: Date, view: string) => {
    switch (view) {
        case Views.DAY:
            const day = moment(startDate).format('dddd, DD MMMM')
            return `${day.charAt(0).toUpperCase()}${day.slice(1)}`
        case Views.WEEK:
            const from = moment(startDate).startOf('week')
            const to = moment(startDate).endOf('week')
            return `${from.format('MMMM DD')} - ${to.format('DD')}`
        case Views.MONTH:
            return moment(startDate).format('MMMM YYYY')
        default:
            return ''
    }
}

function CaltonCalendarHeader({
    startDate,
    setStartDate,
    view,
    setView,
}: CaltonCalendarHeaderProps) {
    const { t } = useTranslation()
    const debouncePrevArrow = useCallback(
        debounce(() => onPrevClick(), 500),
        []
    )
    const debounceNextArrow = useCallback(
        debounce(() => onNextClick(), 500),
        []
    )
    const startDateRef = useRef(startDate)

    useEffect(() => {
        const initialStartDate = moment()
            .startOf(
                view === Views.DAY
                    ? 'day'
                    : view === Views.WEEK
                      ? 'week'
                      : 'month'
            )
            .utcOffset(0, true)
            .toDate()
        setStartDate(initialStartDate)
        startDateRef.current = initialStartDate
    }, [view])

    const onPrevClick = useCallback(() => {
        const previousDate = adjustDate(startDateRef.current, -1, view)
        setStartDate(previousDate)
        startDateRef.current = previousDate
    }, [view, startDate, setStartDate])

    const onNextClick = useCallback(() => {
        const nextDate = adjustDate(startDateRef.current, 1, view)
        setStartDate(nextDate)
        startDateRef.current = nextDate
    }, [view, startDate, setStartDate])

    const handleArrowClick = (type: string) => {
        if (type === 'prev') {
            debouncePrevArrow()
        } else {
            debounceNextArrow()
        }
    }

    const onTodayClick = () => {
        if (view === views.WEEK) {
            const startOfWeek = moment()
                .startOf('week')
                .utcOffset(0, true)
                .toDate()
            setStartDate(startOfWeek)
        } else if (view === views.MONTH) {
            const startOfMonth = moment()
                .startOf('month')
                .utcOffset(0, true)
                .toDate()
            setStartDate(startOfMonth)
        } else if (view === views.DAY) {
            const initialStartDate = moment()
                .startOf('day')
                .utcOffset(0, true)
                .toDate()
            setStartDate(initialStartDate)
        }
    }

    const dateText = useMemo(
        () => formatDate(startDate, view),
        [startDate, view]
    )

    return (
        <div className={styles.calendarHeaderContainer}>
            <div className={styles.leftCalendarContainer}>
                <Button onClick={onTodayClick} className={styles.todayButton}>
                    {t('Oggi')}
                </Button>
                <div className={styles.containerArrows}>
                    <Button
                        onClick={() => handleArrowClick('prev')}
                        icon={<LeftOutlined />}
                        size={'large'}
                        type={'text'}
                    />
                    <Button
                        onClick={() => handleArrowClick('next')}
                        icon={<RightOutlined />}
                        size={'large'}
                        type={'text'}
                    />
                </div>
            </div>
            <h3 className={styles.dateText}>{dateText}</h3>
            <StyledSelect
                value={view}
                onChange={(id: any) => {
                    setView(id)
                }}
                style={{ width: 180, marginLeft: 30 }}
                dropdownRender={(menu) => <StyledMenu>{menu}</StyledMenu>}
            >
                {VIEW_OPTIONS.map((item) => (
                    <Select.Option
                        disabled={item?.id === view}
                        key={item?.id}
                        value={item?.id}
                        className={styles.menuItem}
                    >
                        {t(item?.label)}
                    </Select.Option>
                ))}
            </StyledSelect>
        </div>
    )
}

export default CaltonCalendarHeader
