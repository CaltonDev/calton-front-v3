import { PlusOutlined } from '@ant-design/icons'
import styles from './AddMoreTag.module.scss'
import React from 'react'

interface AddMoreTagProps {
    nameToBeAdded: string
    onClick: (hoursTypeId: string) => void
    hoursTypeId: string
}

const AddMoreTag = ({
    nameToBeAdded,
    onClick,
    hoursTypeId,
}: AddMoreTagProps) => {
    return (
        <div className={styles.container} onClick={() => onClick(hoursTypeId)}>
            <div>
                <PlusOutlined style={{ color: '#3F49FC' }} />
            </div>
            <div className={styles.displayName}>{nameToBeAdded}</div>
        </div>
    )
}

export default AddMoreTag
