import { useTranslation } from 'react-i18next'
import React from 'react'
import styles from './SpecialTimeInput.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { handleAddingSpecialTimeInterval } from '../../helpers/editHoursHelpers'
import StyledDatePicker from '../StyledDatePicker/StyledDatePicker'
import Checkbox from '../Checkbox/Checkbox'
import { SpecialHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import ListingSpecialHoursTimePicker from '../ListingSpecialHoursTimePicker/ListingSpecialHoursTimePicker'

interface SpecialTimeInputProps {
    index: number
    distinctPeriods: SpecialHoursProps[]
    setDistinctPeriods: React.Dispatch<
        React.SetStateAction<SpecialHoursProps[]>
    >
    period: SpecialHoursProps
}

interface CustomInputProps {
    value: string
    onClick: () => void
}

function SpecialTimeInput({
    index,
    distinctPeriods,
    setDistinctPeriods,
    period,
}: SpecialTimeInputProps) {
    const { t } = useTranslation()
    const [startDate, setStartDate] = React.useState(
        new Date(
            period?.startDate.year,
            period?.startDate.month - 1,
            period?.startDate.day
        )
    )
    const [endDate, setEndDate] = React.useState(
        new Date(
            period?.endDate.year,
            period?.endDate.month - 1,
            period?.endDate.day
        )
    )
    const [checkedStatus, setCheckedStatus] = React.useState(period?.closed)
    const [openCheckedStatus, setOpenCheckedStatus] = React.useState(
        period?.openAllDay
    )

    const handleCloseLocation = () => {
        const tmpPeriod = [...distinctPeriods]

        if (!checkedStatus) {
            tmpPeriod[index].hours = []
            tmpPeriod[index].closed = true
            setOpenCheckedStatus(false)
        } else {
            tmpPeriod[index].closed = false
        }

        setCheckedStatus(!checkedStatus)
        setDistinctPeriods(tmpPeriod)
    }

    const handleH24Location = () => {
        const tmpPeriod = [...distinctPeriods]

        if (!openCheckedStatus) {
            tmpPeriod[index].hours = []
            tmpPeriod[index].closed = false
            tmpPeriod[index].openAllDay = true
            setCheckedStatus(false)
        } else {
            tmpPeriod[index].openAllDay = false
        }

        setOpenCheckedStatus(!openCheckedStatus)
        setDistinctPeriods(tmpPeriod)
    }

    const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
        ({ value, onClick }, ref) => (
            <input
                className={styles.customInput}
                readOnly
                onClick={onClick}
                ref={ref}
                value={value}
            />
        )
    )

    CustomInput.displayName = 'CustomInput'

    const handleAddMore = (startDate: any, endDate: any) => {
        handleAddingSpecialTimeInterval(
            startDate,
            endDate,
            distinctPeriods,
            setDistinctPeriods,
            index
        )
    }

    const handleSetStartDate = (date: any) => {
        setStartDate(date)
        if (date !== null) {
            const tmpPeriod = [...distinctPeriods]
            tmpPeriod[index].startDate = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
            }

            tmpPeriod[index].endDate = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
            }

            setDistinctPeriods(tmpPeriod)
        }
    }
    return (
        <div
            className={styles.holidayContainer}
            key={period?.toString() + index}
        >
            <div className={styles.holidayContent}>
                <StyledDatePicker
                    selected={startDate}
                    onChange={(date: any) => handleSetStartDate(date)}
                    selectsRange={false}
                    isClearable={false}
                    shouldCloseOnSelect={true}
                    startOpen={false}
                    preventOpenOnFocus={true}
                    allowSameDay={true}
                    //locale={i18n.language}
                    placeholderText="00/00/0000"
                    dateFormat="dd/MM/yyyy"
                    // customInput={<CustomInput />}
                />
                <div className={styles.timePickerContainer}>
                    <div className={styles.timePickerRow}>
                        {!checkedStatus && period?.hours?.length > 0
                            ? period?.hours?.map((h, i) => {
                                  return (
                                      <div
                                          key={
                                              h?.openTime?.hours
                                                  ? index + h.openTime.hours + i
                                                  : index + i
                                          }
                                      >
                                          <ListingSpecialHoursTimePicker
                                              periodIndex={index}
                                              hourIndex={i}
                                              hour={h}
                                              distinctPeriods={distinctPeriods}
                                              setDistinctPeriods={
                                                  setDistinctPeriods
                                              }
                                              lastElementIndex={
                                                  period?.hours?.length - 1
                                              }
                                          />
                                      </div>
                                  )
                              })
                            : !checkedStatus && (
                                  <div
                                      style={{
                                          cursor: 'pointer',
                                          marginLeft: '1em',
                                          marginRight: 'auto',
                                          marginBottom: '3px',
                                      }}
                                      onClick={() =>
                                          handleAddMore(startDate, endDate)
                                      }
                                  >
                                      <PlusOutlined
                                          style={{ verticalAlign: 0 }}
                                      />
                                  </div>
                              )}
                    </div>
                </div>
            </div>
            <div className={styles.dayCheckbox}>
                <Checkbox
                    onClick={() => handleCloseLocation()}
                    checked={checkedStatus}
                    title={t('Chiuso')}
                />
                <Checkbox
                    // style={{ marginLeft: 20 }}
                    onClick={() => handleH24Location()}
                    checked={openCheckedStatus}
                    title={t('Aperto H24')}
                />
            </div>
        </div>
    )
}

export default SpecialTimeInput
