import React, { useEffect, useState } from 'react'
import styles from './TimeFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import {
    resetFilters,
    setAllFilters,
    setStateSelect,
} from '../../../../../store/filters/filtersSlice'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { es, it, enGB } from 'date-fns/locale'
import { defaultStaticRanges } from '../../../../../utils/utils'

import { createGlobalStyle } from 'styled-components'
import Input from '../../../../Input/Input'
import Typography from '../../../../Typography/Typography'
import Checkbox from '../../../../Checkbox/Checkbox'

const days: { [index: string]: any } = {
    Monday: 'Lunedì',
    Tuesday: 'Martedì',
    Wednesday: 'Mercoledì',
    Thursday: 'Giovedì',
    Friday: 'Venerdì',
    Saturday: 'Sabato',
    Sunday: 'Domenica',
}
const DatePickerWrapperStyles = createGlobalStyle`
  .date_picker.full-width {
    width: 100%;
  }
  
  .react-datepicker {
      border: none;
      width: 100% !important;
      padding-top: 10px;
      border-radius: unset;
  }
  .react-datepicker-popper {
      width: 100% !important;
      transform: translate(0px, 70px) !important;
  }
  
  .react-datepicker__month {
      margin-top: 20px;
  }
  
  .react-datepicker__current-month {
      position: absolute;
      padding-left: 20px !important;
  }
  
  .react-datepicker__month-container {
      width: 100% !important;
  }

  .react-datepicker__triangle {
      display: none !important;
  }
  
  .react-datepicker__day-names {
      display: none !important;
  }
  .react-datepicker__input-container input{
    width: 102%;
    text-align: center;
    font-family: "Montserrat", "Heebo", sans-serif !important;
    height: 2.5rem;
    border-radius: 25px !important;
    font-size: 16px;
  }
  
  .react-datepicker__header {
      background: white !important;
      border: none;
  }
  .react-datepicker__input-container button::after{
    background-color: #888eff;
  }
  .my-little-popper .react-datepicker{
    font-family: "Montserrat", "Heebo", sans-serif !important;
   /* width: 17.1rem;
    padding: 10px;
    height: 43rem;*/
  }    
  .react-datepicker__navigation--next{
      margin-top: 10px;
  }    
  .react-datepicker__navigation--previous{
    right: 20px;
    left: auto;
    margin-top: 10px;
  }
  .my-little-popper .react-datepicker .react-datepicker__triangle{
    transform: translate3d(134.5px, 0px, 0px)!important;
  }
  .my-little-popper .react-datepicker .react-datepicker__month-container .react-datepicker__month .react-datepicker__week .react-datepicker__day--in-range{
    background-color: #34E0A1 !important;
    color: #FFFFFF !important;
  }
  .my-little-popper .react-datepicker .react-datepicker__month-container .react-datepicker__month .react-datepicker__week .react-datepicker__day--range-end{
    background-color: #3f49fc !important;
    color: #FFFFFF !important;
  }
  .my-little-popper .react-datepicker .react-datepicker__month-container .react-datepicker__month .react-datepicker__week .react-datepicker__day:hover{
    background-color: #3f49fc !important;
    color: #FFFFFF !important;
  }
  .my-little-popper .react-datepicker .react-datepicker__month-container .react-datepicker__header  .react-datepicker__day-names{
    padding-top: 15px;
  }  
  .my-little-popper .react-datepicker .react-datepicker__month-container .react-datepicker__month .react-datepicker__week .react-datepicker__day{
    display: inline-block;
    width: 1.7rem;
    line-height: 1.7rem;
    text-align: center;
    margin: 0.166rem;
  }  
  .my-little-popper .react-datepicker .react-datepicker__month-container .react-datepicker__month .react-datepicker__week{
    //height: 3rem;
    //font-size: 1rem;
  }
  .my-little-popper .react-datepicker .react-datepicker__month-container .react-datepicker__month .react-datepicker__header{
    padding: 8px 0;
    position: relative;
  }
`

function TimeFilter() {
    const dispatch = useDispatch()
    const [showPickerDate, setShowPickerDate] = useState(true)
    const { startDate, endDate, timeLabel } = useSelector(selectAllFilters)
    const [startDatef, setStartDate] = useState(startDate && moment(startDate))
    const [endDatef, setEndDate] = useState(startDate && moment(endDate))
    const [dateRange, setDateRange] = useState([
        startDatef?.toDate(),
        endDatef?.toDate(),
    ])
    const [start, end] = dateRange
    const [rangeHelperState, setRangeHelperState] = useState([])
    const [firstTime, setFirstTime] = useState(true)
    const { t, i18n } = useTranslation()
    const [startDateInputValue, setStartDateInputValue] = useState(startDate)
    const [endDateInputValue, setEndDateInputValue] = useState(endDate)

    registerLocale(
        i18n.language,
        i18n.language === 'es' ? es : i18n.language === 'it' ? it : enGB
    )
    setDefaultLocale(i18n.language)

    React.useEffect(() => {
        if (dateRange?.length >= 2 && !firstTime) {
            handleChange(dateRange[0], dateRange[1])
        }
    }, [dateRange])

    React.useEffect(() => {
        setDateRange([moment(startDate)?.toDate(), moment(endDate)?.toDate()])
    }, [startDate, endDate])

    function usePrevious(value: any) {
        const ref = React.useRef()
        React.useEffect(() => {
            ref.current = value
        })
        return ref.current
    }
    const previousHelperState = usePrevious(rangeHelperState)
    React.useEffect(() => {
        if (
            rangeHelperState &&
            previousHelperState &&
            Date.parse(rangeHelperState[0]) < Date.parse(previousHelperState[0])
        ) {
            setDateRange([rangeHelperState[0], previousHelperState[0]])
        }
    }, [rangeHelperState])

    const setRangeParseHelper = (update: any) => {
        setFirstTime(false)
        setDateRange(update)
        if (update[0] && !update[1]) {
            setRangeHelperState(update)
        }
    }

    useEffect(() => {
        dispatch(resetFilters())
    }, [])

    const handleChange = (startDate: Date, endDate: Date, label = '') => {
        if (label === timeLabel) {
            const payload = {
                dis1day: false,
                dis7days: true,
                dis1month: true,
                dis3months: true,
                dis6months: true,
                dis1year: true,
                groupby: '1d',
                timeLabel: '',
            }
            dispatch(setAllFilters(payload))
        } else {
            if (endDate && startDate) {
                const dateObj: any = {
                    startDate: startDate,
                    endDate: endDate,
                }

                dateObj.startDate = moment(dateObj?.startDate).format(
                    'YYYY-MM-DD'
                )
                dateObj.endDate = moment(dateObj?.endDate).format('YYYY-MM-DD')
                setStartDate(moment(startDate))
                setEndDate(moment(endDate))
                let res = null
                if (dateObj.startDate === dateObj.endDate) {
                    res = {
                        startDate: dateObj.startDate,
                        endDate: dateObj.endDate,
                    }
                } else {
                    res = dateObj
                }

                const numDays = Math.round(
                    moment(res.endDate).diff(moment(res.startDate), 'days')
                )
                const groupby = null

                if (numDays <= 14) {
                    const payload = {
                        dis1day: false,
                        dis7days: true,
                        dis1month: true,
                        dis3months: true,
                        dis6months: true,
                        dis1year: true,
                        groupby: '1d',
                        timeLabel: label,
                    }
                    dispatch(setAllFilters(payload))
                } else if (numDays > 14 && numDays <= 62) {
                    const payload = {
                        dis1day: false,
                        dis7days: false,
                        dis1month: true,
                        dis3months: true,
                        dis6months: true,
                        dis1year: true,
                        groupby: 'w',
                        timeLabel: label,
                    }
                    dispatch(setAllFilters(payload))
                } else if (numDays > 62 && numDays <= 186) {
                    const payload = {
                        dis1day: false,
                        dis7days: false,
                        dis1month: false,
                        dis3months: true,
                        dis6months: true,
                        dis1year: true,
                        groupby: 'M',
                        timeLabel: label,
                    }
                    dispatch(setAllFilters(payload))
                } else if (numDays > 186 && numDays <= 366) {
                    const payload = {
                        dis1day: false,
                        dis7days: false,
                        dis1month: false,
                        dis3months: false,
                        dis6months: true,
                        dis1year: true,
                        groupby: 'Q',
                        timeLabel: label,
                    }
                    dispatch(setAllFilters(payload))
                } else if (numDays > 366 && numDays <= 730) {
                    const payload = {
                        dis1day: false,
                        dis7days: false,
                        dis1month: false,
                        dis3months: false,
                        dis6months: false,
                        dis1year: true,
                        groupby: '2Q',
                        timeLabel: label,
                    }
                    dispatch(setAllFilters(payload))
                } else {
                    const payload = {
                        dis1day: false,
                        dis7days: false,
                        dis1month: false,
                        dis3months: false,
                        dis6months: false,
                        dis1year: false,
                        groupby: 'Y',
                        timeLabel: label,
                    }
                    dispatch(setAllFilters(payload))
                }
                const payload = {
                    type: 'time',
                    value: res,
                    optional: groupby,
                    labelDate: label,
                    timeLabel: label,
                }
                dispatch(setStateSelect(payload))
            }
        }
    }

    const calendarKeyDownParse = (e: any) => {
        const userInput = e.target.value
        const keyCode = e.keyCode
        const regex = /\d{1,2}\/\d{1,2}\/\d{2,4}/
        const inputArr = userInput?.split(' - ').map((d: any) => d.match(regex))
        if (
            userInput?.match(/^[0-9\/\s-]+$/) &&
            inputArr[0] &&
            inputArr[1] &&
            keyCode === 13
        ) {
            const parsedTime = userInput?.split(' - ')?.map((d: string) => {
                const date = d.split('/')
                return new Date(
                    Number(date[2]),
                    Number(date[1]) - 1,
                    Number(date[0])
                )
            })

            setDateRange([])

            Date.parse(parsedTime[1]) >= Date.parse(parsedTime[0])
                ? setDateRange(parsedTime)
                : setDateRange([startDatef?.toDate(), endDatef?.toDate()])
        }
    }

    const handleDateInput = (e: any, type: string) => {
        const inputDate = e?.target?.value
        const formattedDate = moment(inputDate).toDate()
        const tmpDateObj = [...dateRange]
        if (type === 'start') {
            tmpDateObj[0] = formattedDate
            setStartDateInputValue(e?.target?.value)
        } else {
            tmpDateObj[1] = formattedDate
            setEndDateInputValue(e?.target?.value)
        }

        setDateRange(tmpDateObj)
    }
    return (
        <div className={styles.container}>
            {showPickerDate && (
                <div
                    // className={styles.customFormControl}
                    key={endDatef.format('yyyy-mm-dd')}
                    style={{
                        height: '100%',
                    }}
                >
                    <DatePicker
                        wrapperClassName="date_picker full-width"
                        popperClassName="my-little-popper"
                        open={true}
                        selectsRange={true}
                        dateFormat={'dd/MM/yyyy'}
                        selected={end}
                        startDate={start}
                        endDate={end}
                        onChange={(update) => setRangeParseHelper(update)}
                        formatWeekDay={(nameOfDay) =>
                            days[nameOfDay]?.substr(0, 2)
                        }
                        isClearable={true}
                        shouldCloseOnSelect={false}
                        onKeyDown={(e) => calendarKeyDownParse(e)}
                        startOpen={false}
                        preventOpenOnFocus={true}
                        allowSameDay={true}
                        locale={i18n.language}
                        inline
                    />
                    <DatePickerWrapperStyles />
                </div>
            )}

            <div className={styles.contentDiv}>
                <div className={styles.generalContainer}>
                    <div className={styles.typographyDiv}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Inserisci data')}
                        </Typography>
                    </div>
                    <Input
                        size={'small'}
                        placeholder={'test'}
                        type={'date'}
                        fullWidth={true}
                        onChange={(e) => handleDateInput(e, 'start')}
                        value={startDateInputValue}
                    />
                    <Input
                        size={'small'}
                        placeholder={'test'}
                        fullWidth={true}
                        type={'date'}
                        onChange={(e) => handleDateInput(e, 'end')}
                        value={endDateInputValue}
                    />
                </div>
                <div className={styles.generalContainer}>
                    <div className={styles.typographyDiv}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Oppure seleziona')}
                        </Typography>
                    </div>
                    <div className={styles.radioDiv}>
                        {defaultStaticRanges(t).map(
                            ({ label, startDate, endDate }) => {
                                return (
                                    <Checkbox
                                        key={label}
                                        type={'radio'}
                                        title={label}
                                        checked={timeLabel === label}
                                        onClick={() =>
                                            handleChange(
                                                startDate,
                                                endDate,
                                                label
                                            )
                                        }
                                    />
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeFilter
