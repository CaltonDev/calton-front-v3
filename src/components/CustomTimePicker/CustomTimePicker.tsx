import React, { useState } from 'react'
import styles from './CustomTimePicker.module.scss'
import { CustomTimePickerProps } from './CustomTimePicker.interface'
import { CaretDownOutlined } from '@ant-design/icons'

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
    value,
    onChange,
}) => {
    const [time, setTime] = useState(value || '')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = event.target.value
        setTime(newTime)
        if (onChange) {
            onChange(newTime)
        }
    }

    return (
        <div className={styles.customTimePicker}>
            <input
                className={styles.picker}
                type="time"
                value={time}
                onChange={handleChange}
            />
        </div>
    )
}

export default CustomTimePicker

// import React, { useState } from 'react'
// import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
// import styles from './CustomTimePicker.module.scss' // Assume custom CSS styles
// import { CustomTimePickerProps } from './CustomTimePicker.interface'

// const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
//     placeholder,
//     value,
//     onChange,
//     minuteStep = 5,
//     format = 'HH:mm',
// }) => {
//     const [isOpen, setIsOpen] = useState(false)
//     const [selectedTime, setSelectedTime] = useState(value || null)

//     const handleOpenChange = (open: boolean) => {
//         setIsOpen(open)
//     }

//     const handleSelectTime = (event: any) => {
//         const newTime = event.target.value
//         setSelectedTime(newTime)
//         onChange(newTime) // Assuming `onChange` is passed as prop
//     }

//     return (
//         <div className={styles.picker}>
//             <div className={styles.inputWrapper}>
//                 <input
//                     type="text"
//                     className={styles.input}
//                     placeholder={placeholder}
//                     value={selectedTime ? selectedTime : ''}
//                     onFocus={() => handleOpenChange(true)}
//                     onChange={handleSelectTime}
//                 />
//                 <span className={styles.suffixIcon}>
//                     {isOpen ? <CaretDownOutlined /> : <CaretRightOutlined />}
//                 </span>
//             </div>

//             {isOpen && (
//                 <div className={styles.dropdown}>
//                     {/* Render time options in steps of minuteStep */}
//                     {Array.from({ length: (24 * 60) / minuteStep }, (_, i) => {
//                         const hours = Math.floor((i * minuteStep) / 60)
//                         const minutes = (i * minuteStep) % 60
//                         const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

//                         return (
//                             <div
//                                 key={i}
//                                 className={styles.timeOption}
//                                 onClick={() => {
//                                     setSelectedTime(time)
//                                     handleOpenChange(false)
//                                     onChange(time)
//                                 }}
//                             >
//                                 {time}
//                             </div>
//                         )
//                     })}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default CustomTimePicker
