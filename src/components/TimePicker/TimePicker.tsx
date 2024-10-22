import styles from './TimePicker.module.scss'
import React from 'react'
import TimePicker from 'rc-time-picker'
import { TimePickerProps } from './TimePicker.interface'
import { IoIosArrowDown } from 'react-icons/io'

const CaltonTimePicker: React.FC<TimePickerProps> = ({
    onChange,
    value,
    variant,
}) => {
    const variantClass = variant ? styles[variant] : ''

    return (
        <div className={styles.timePickerWrapper}>
            <TimePicker
                showSecond={false}
                onChange={onChange}
                use12Hours
                className={`${styles.picker} ${variantClass}`}
                value={value}
                format={'HH:mm'}
                minuteStep={5}
                allowEmpty={false}
            />
            <IoIosArrowDown className={styles.icon} />
        </div>
    )
}

export default CaltonTimePicker
