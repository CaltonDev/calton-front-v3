import styles from './DatePicker.module.scss'
import DatePicker from 'react-datepicker'
import React from 'react'
import { DatePickerProps } from './DatePicker.interface'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'

const CaltonDatePicker: React.FC<DatePickerProps> = ({
    variant = 'primary',
    selected,
    onChange,
    isClearable = false,
    shouldCloseOnSelect = true,
    startOpen = false,
    preventOpenOnFocus = true,
    allowSameDay = true,
    placeholderText = '00/00/0000',
    dateFormat = 'dd/MM/yyyy',
}) => {
    const variantClass = variant ? styles[variant] : ''
    const { t } = useTranslation()
    return (
        <div className={styles.datePickerContainer}>
            <Typography size={'bodySmall'} color={'tertiary'} weight={'normal'}>
                {t('Date')}
            </Typography>
            <DatePicker
                selected={selected}
                onChange={onChange}
                isClearable={isClearable}
                shouldCloseOnSelect={shouldCloseOnSelect}
                startOpen={startOpen}
                preventOpenOnFocus={preventOpenOnFocus}
                allowSameDay={allowSameDay}
                placeholderText={placeholderText}
                dateFormat={dateFormat}
                className={`${styles.picker} ${variantClass}`}
            />
        </div>
    )
}

export default CaltonDatePicker
